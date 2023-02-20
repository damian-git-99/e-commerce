const { encryptPassword } = require('../../shared/encrypt');
const { generateToken } = require('../../shared/generateToken');
const userDao = require('./authDao');
const EmailAlreadyTakenException = require('./errors/EmailAlreadyTakenException');

const findByEmail = (email) => {
  return userDao.findByEmail(email);
};

const createUser = async (user) => {
  const userExists = await findByEmail(user.email);
  if (userExists) {
    throw new EmailAlreadyTakenException();
  }
  user.password = encryptPassword(user.password);
  user = await userDao.save(user);
  const token = generateToken({ id: user.id });
  return {
    token,
    user
  };
};

module.exports = {
  findByEmail,
  createUser
};
