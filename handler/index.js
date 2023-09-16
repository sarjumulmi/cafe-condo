const { login, getPaymentData } = require('../scraper');
const db = require('../db/models');
const puppeteer = require('puppeteer');

exports.populateInvoices = async function (paymentData, db) {
  const chargeData = paymentData.map((data) => ({
    ...data,
    charge_date: data.date,
    charge_title: data.chargeTitle
  }));
  try {
    db.models.invoice.bulkCreate(chargeData, { ignoreDuplicates: true });
  } catch (error) {
    throw error;
  }
};

exports.scrapePaymentData = async function () {
  let browser;
  try {
    const puppeteerConfig = {
      headless: 'new',
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true
    };

    if (process.env.ENV === 'production') {
      puppeteerConfig.executablePath = '/usr/bin/chromium-browser';
    }

    browser = await puppeteer.launch(puppeteerConfig);
    const page = await login(
      browser,
      process.env.BASE_URL,
      process.env.EMAIL,
      process.env.PASSWORD
    );
    paymentData = await getPaymentData(page, {
      includeWaterChargesOnly: false
    });
    return paymentData;
  } catch (error) {
    throw error;
  } finally {
    await browser?.close();
  }
};

// (async () => {
//   await exports.populateInvoices(
//     [
//       {
//         charge_date: new Date('2023-01-17T04:33:12.000Z'),
//         charge_title: 'sewer consumption',
//         amount: 25.23,
//         unit: '154'
//       },
//       {
//         charge_date: new Date('2022-01-17T04:33:12.000Z'),
//         charge_title: 'water consumption',
//         amount: 25.23,
//         unit: '154'
//       }
//     ],
//     db
//   );
// })();
