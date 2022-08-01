const { UnauthorizedError } = require('../errors/errors');

const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next(new UnauthorizedError());
  }
};

module.exports = {
  authMiddleware,
};
