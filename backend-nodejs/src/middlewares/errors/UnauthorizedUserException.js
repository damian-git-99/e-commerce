class UnauthorizedUserException {
  constructor() {
    this.status = 403;
    this.message = 'Not authorized as an admin';
  }
}

module.exports = UnauthorizedUserException;
