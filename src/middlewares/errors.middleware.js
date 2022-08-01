const errorsMiddleware = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).send({
      success: false,
      message: error.message,
    });
  } else next();
};

module.exports = {
  errorsMiddleware,
};
