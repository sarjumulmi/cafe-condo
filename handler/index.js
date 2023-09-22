const { login, getPaymentData } = require('../scraper');
const db = require('../db/models');
const puppeteer = require('puppeteer');

exports.populateInvoices = async function (paymentData, db) {
  const chargeData = paymentData.map((data) => ({
    ...data,
    charge_date: data.date.setMonth(data.date.getMonth() - 1),
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
      headless: false,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true
    };

    if (process.env.ENV === 'production') {
      puppeteerConfig.executablePath = '/usr/bin/chromium-browser';
    } else {
      puppeteerConfig.executablePath =
        '/Applications/Chromium.app/Contents/MacOS/Chromium';
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

exports.getPaymentData = async function (db) {
  const now = new Date();
  const year = now.getFullYear();
  const { models, sequelize } = db;
  try {
    const data = models.invoice.findAll({
      where: sequelize.where(
        sequelize.literal('extract(year from charge_date)'),
        year
      )
      // raw: true
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
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
