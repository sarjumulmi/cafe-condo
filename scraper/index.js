const puppeteer = require('puppeteer');
// require('dotenv').config();

const { login } = require('./login');
const { getPaymentData, getNormalizedPaymentData } = require('./scraper');

module.exports = { login, getPaymentData, getNormalizedPaymentData };

// (async function () {
//   console.log('starting web scraper ', Date());
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ['--disable-setuid-sandbox'],
//     ignoreHTTPSErrors: true
//   });
//   const page = await login(
//     browser,
//     process.env.BASE_URL,
//     process.env.EMAIL,
//     process.env.PASSWORD
//   );
//   const paymentData = getNormalizedPaymentData(
//     await getPaymentData(page, { includeWaterChargesOnly: false })
//   );
//   console.log('length', Object.keys(paymentData).length);
//   console.log(paymentData);
// })();

// (function () {
//   const chargeTitleRegexes = [
//     /Consumption Based Water Charge Water Charge/,
//     /Water Base Fee Water Base Charge/,
//     /Apartment Utilities Fee/,
//     /Consumption Based Sewer Charge Sewer Charge/,
//     /Sewer Base Fee Sewer Base Charge/,
//     /Special Assessment/
//   ];

//   const match = chargeTitleRegexes.some((rgx) =>
//     rgx.test(' Assessment (6/2023)')
//   );
//   console.log('match ? ', match);
// })();
