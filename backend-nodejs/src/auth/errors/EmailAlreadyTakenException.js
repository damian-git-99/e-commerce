class EmailAlreadyTakenException {
  constructor() {
    this.status = 400;
    this.message = 'Email is already taken';
  }
}

module.exports = EmailAlreadyTakenException;
