const { login } = require('./login');
const { getPaymentData, getNormalizedPaymentData } = require('./scraper');

module.exports = { login, getPaymentData, getNormalizedPaymentData };
