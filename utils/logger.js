const { createLogger, format, transports } = require('winston');

module.exports = exports = function () {
  return createLogger({
    level: 'info',
    transports: [new transports.Console({})],
    format: format.combine(format.timestamp(), format.json())
  });
};
