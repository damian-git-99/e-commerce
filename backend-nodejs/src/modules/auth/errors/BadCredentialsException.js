class BadCredentialsException {
  constructor() {
    this.status = 401;
    this.message = 'bad credentials';
  }
}

module.exports = BadCredentialsException;
