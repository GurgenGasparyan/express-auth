// 400
class UnauthorizedError extends Error {
  constructor() {
    super();
    this.status = 401;
    this.message = 'Invalid credentials';
  }
}

class BadRequest extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}

class NotFound extends Error {
  constructor() {
    super();
    this.status = 404;
    this.message = 'Not found';
  }
}

//500
class InternalServerError extends Error {
  constructor(message = 'Something went wrong') {
    super();
    this.status = 500;
    this.message = message;
  }
}

module.exports = {
  UnauthorizedError,
  InternalServerError,
  BadRequest,
  NotFound,
};
