const jwt = require('jsonwebtoken');
const config = require('config');
const KEY = config.get('JWT_SECRET');

/**
 * It takes a payload and a key, and returns a JWT token.
 * @param payload - The data you want to store in the token.
 * @param [key] - The secret key used to sign the token.
 * @returns A token
 */
const generateToken = (payload, key = KEY) => {
  const token = jwt.sign({ ...payload }, key, { expiresIn: '2h' });
  return token;
};

module.exports = {
  generateToken
};
