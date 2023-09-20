const Promise = require('bluebird');
const { logger } = require('../utils');

const db = require('../db/models');
const { populateInvoices, scrapePaymentData } = require('../handler');

Promise.resolve()
  .then(() => scrapePaymentData())
  .then((paymentData) => {
    populateInvoices(paymentData, db);
    logger.info('finished populating invoice');
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
