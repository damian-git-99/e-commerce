class UserNotFoundException {
  constructor() {
    this.status = 404;
    this.message = 'user not found';
  }
}

module.exports = UserNotFoundException;
