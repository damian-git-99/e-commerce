class InvalidImageException {
  constructor(message = '') {
    this.status = 400;
    this.message = message;
  }
}

module.exports = InvalidImageException;
