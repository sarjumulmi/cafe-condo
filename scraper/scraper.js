const cheerio = require('cheerio');
const _ = require('lodash');

const transactionPeriodSelector = {
  currentYear: '2',
  previousYear: '3',
  all: '0'
};

const waterChargeTitles = [
  'Consumption Based Water Charge Water Charge',
  'Water Base Fee Water Base Charge',
  'Apartment Utilities Fee',
  'Consumption Based Sewer Charge Sewer Charge',
  'Sewer Base Fee Sewer Base Charge'
];

const chargeTitleRegexes = [
  /Consumption Based Water Charge Water Charge/,
  /Water Base Fee Water Base Charge/,
  /Apartment Utilities Fee/,
  /Consumption Based Sewer Charge Sewer Charge/,
  /Sewer Base Fee Sewer Base Charge/,
  /Apartment Utilities Fee/,
  /Assoc Dues/,
  /Condo Internet Fees/,
  /Parking Assessment/,
  /Replacement Reserves/,
  /Special Assessment/
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

exports.getNormalizedPaymentData = function (paymentData) {
  const normalizedPaymentData = _(paymentData)
    .orderBy(['date'], ['desc'])
    .groupBy((d) => {
      const [month, year] = getMonthYear(d.date);
      return `${month}, ${year}`;
    })
    .value();

  for (const period in normalizedPaymentData) {
    const total = normalizedPaymentData[period].reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    normalizedPaymentData[period].push({
      totalMonthly: Math.round(total * 100) / 100
    });
    normalizedPaymentData[period].forEach((data) => {
      if (!!data.date) {
        data.date = data.date.toLocaleDateString();
      }
    });
  }
  return normalizedPaymentData;
};

exports.getPaymentData = async function (
  page,
  {
    selectedTransactionPeriod = 'currentYear',
    includeWaterChargesOnly = true
  } = {}
) {
  try {
    await page.click('#ResServicesContent ul li:first-child a');
    await page.waitForSelector('#LinkRecentActivity', {
      timeout: 4 * 60 * 1000
    });
    await page.click('#LinkRecentActivity');
    await page.waitForSelector('#TransactionPeriod', {
      timeout: 4 * 60 * 1000
    });
    const transactionPeriod =
      transactionPeriodSelector[selectedTransactionPeriod] ?? '2';
    await page.select('#TransactionPeriod', transactionPeriod);
    await page.click('#formbutton');
    await page.waitForTimeout(2000);
    await page.select('.dataTables_length select', '100');

    let paymentData = [];
    let more = true;

    while (more) {
      const content = await page.content();
      const $ = cheerio.load(content);
      $('#divLedger table tbody tr').each((i, row) => {
        const chargeTitle = $(row)
          .find('td[data-label="Payments and Charges"]')
          .text();
        if (chargeTitleRegexes.some((rgx) => rgx.test(chargeTitle))) {
          const date = new Date($(row).find('td[data-label="Date"]').text());
          const data = {
            date,
            chargeTitle: chargeTitle,
            amount: parseFloat(
              $(row).find('td[data-label="Charges"]').text().replace('$', '')
            ),
            unit: $(row).find('td[data-label="Unit"]').text()
          };

          includeWaterChargesOnly
            ? waterChargeTitles.includes(data.chargeTitle) &&
              paymentData.push(data)
            : paymentData.push(data);
        }
      });

      const next = $('.pagination ul li.next:not(.disabled)');
      more = next.length === 0 ? false : true;

      if (more) {
        await page.click('.pagination ul li.next:not(.disabled) a');
        await page.waitForTimeout(2000);
      }
    }

    return paymentData;
  } catch (error) {
    throw error;
  }
};

exports.getFlattenedPaymentData = (paymentData) => {
  const flattenedPaymentData = [];

  for (const key in paymentData) {
    if (Object.hasOwnProperty.call(paymentData, key)) {
      const charges = paymentData[key]; //[{},{}...]
      flattenedPaymentData.push(...charges);
    }
  }

  return flattenedPaymentData;
};

function getMonthYear(date) {
  let monthIdx = date.getMonth() - 1;
  let year = date.getFullYear();

  if (monthIdx === -1) {
    monthIdx = 11;
    year--;
  }

  return [monthNames[monthIdx], year];
}
