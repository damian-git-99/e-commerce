const jwt = require('jsonwebtoken');

const generateToken = (payload, key) => {
  const token = jwt.sign({ ...payload }, key, { expiresIn: '2h' });
  return token;
};

module.exports = {
  generateToken
};
