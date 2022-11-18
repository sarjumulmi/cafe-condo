const cheerio = require('cheerio');
const _ = require('lodash');

const transactionPeriodSelector = {
  currentYear: '2',
  previousYear: '3',
  all: '0',
};

const waterChargeTitles = [
  'Consumption Based Water Charge Water Charge',
  'Water Base Fee Water Base Charge',
  'Apartment Utilities Fee',
  'Consumption Based Sewer Charge Sewer Charge',
  'Sewer Base Fee Sewer Base Charge',
];

const monthNames = [
  'December',
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
];

async function getPaymentData(page, selectedTransactionPeriod = 'currentYear') {
  try {
    await page.click('#ResServicesContent ul li:first-child a');
    await page.waitForSelector('#LinkRecentActivity');
    await page.click('#LinkRecentActivity');
    await page.waitForSelector('#TransactionPeriod');
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
        const date = new Date($(row).find('td[data-label="Date"]').text());
        const data = {
          unit: $(row).find('td[data-label="Unit"]').text(),
          date,
          chargeTitle: $(row)
            .find('td[data-label="Payments and Charges"]')
            .text(),
          amount: parseFloat(
            $(row).find('td[data-label="Charges"]').text().replace('$', ''),
          ),
        };
        waterChargeTitles.includes(data.chargeTitle) && paymentData.push(data);
      });

      const next = $('.pagination ul li.next:not(.disabled)');
      more = next.length === 0 ? false : true;

      if (more) {
        await page.click('.pagination ul li.next:not(.disabled) a');
        await page.waitForTimeout(2000);
      }
    }

    paymentData = _(paymentData)
      .orderBy(['date'], ['desc'])
      .groupBy(
        (d) => `${monthNames[d.date.getMonth()]}, ${d.date.getFullYear()}`,
      )
      .value();
    for (const period in paymentData) {
      const total = paymentData[period].reduce((prev, curr) => {
        return prev + curr.amount;
      }, 0);
      paymentData[period].push({ totalMonthly: Math.round(total * 100) / 100 });
      paymentData[period].forEach((data) => {
        if (!!data.date) {
          data.date = data.date.toLocaleDateString();
        }
      });
    }
    return paymentData;
  } catch (error) {
    throw error;
  }
}

module.exports = getPaymentData;
