const logger = require('./logger');

const attachLogger = (req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || 'no-correlation-id';
  req.log = logger.child({ correlationId });
  req.correlationId = correlationId;
  next();
};

module.exports = { attachLogger };
