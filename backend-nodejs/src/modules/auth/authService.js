const { encryptPassword } = require('../../shared/encrypt');
const userDao = require('./authDao');

const findByEmail = (email) => {
  return userDao.findByEmail(email);
};

const createUser = (user) => {
  user.password = encryptPassword(user.password);
  return userDao.save(user);
};

module.exports = {
  findByEmail,
  createUser
};
