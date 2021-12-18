const jwt = require('jsonwebtoken');

const generateToken = (payload, key = process.env.JWT_SECRET) => {
  const token = jwt.sign({ ...payload }, key, { expiresIn: '2h' });
  return token;
};

module.exports = {
  generateToken
};
