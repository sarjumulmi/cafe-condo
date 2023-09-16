#!/usr/bin/env node
const Promise = require('bluebird');

const db = require('../db/models');
const { populateInvoices, scrapePaymentData } = require('../handler');

Promise.resolve()
  .then(() => scrapePaymentData())
  .then((paymentData) => {
    populateInvoices(paymentData, db);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
