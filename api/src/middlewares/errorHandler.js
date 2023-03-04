const responseSender = require("../helpers/responseSender.helper");

function errorHandler(err, req, res, next) {
  req.log.error(err.message, err);

  if (err.name === "ValidationError" && err.errors) {
    const errMsgs = Object.keys(err.errors).map((errKey) => {
      return (
        err.errors[errKey]?.properties?.message ?? "Some validation failed"
      );
    });
    return responseSender.sendValidationError(res, errMsgs);
  } else
    return responseSender.sendErrorResponse(res, err.message, err.code ?? 500);
}

module.exports = errorHandler;
