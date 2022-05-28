// const puppeteer = require('puppeteer');
// require('dotenv').config();

const login = require('./login');
const getPaymentData = require('./scraper');

module.exports = { login, getPaymentData };

// (async function () {
//   console.log('starting web scraper ', Date());
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ['--disable-setuid-sandbox'],
//     ignoreHTTPSErrors: true,
//   });
//   const page = await login(
//     browser,
//     process.env.BASE_URL,
//     process.env.EMAIL,
//     process.env.PASSWORD,
//   );
//   const paymentData = await getPaymentData(page);
//   console.log(paymentData);
// })();
