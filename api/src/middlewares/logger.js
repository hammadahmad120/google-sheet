const bunyan = require("bunyan");
const uuid = require("uuid");

const logger = bunyan.createLogger({
  name: "PsycCheck API",
  serializers: bunyan.stdSerializers,
});

function loggerMiddleware(req, res, next) {
  req.log = logger.child({ req_id: uuid.v4() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
}

module.exports = { logger, loggerMiddleware };
