class InvalidTokenException {
  constructor() {
    this.status = 401;
    this.message = 'invalid token';
  }
}

module.exports = InvalidTokenException;
