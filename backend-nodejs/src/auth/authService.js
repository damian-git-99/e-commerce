const { encryptPassword, comparePasswords } = require('../shared/encrypt');
const { generateToken } = require('../shared/generateToken');
const userDao = require('./authDao');
const BadCredentialsException = require('./errors/BadCredentialsException');
const EmailAlreadyTakenException = require('./errors/EmailAlreadyTakenException');

const signUp = async (user) => {
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

const login = async (user) => {
  const userExists = await findByEmail(user.email);

  if (!userExists) {
    throw new BadCredentialsException();
  }

  if (!comparePasswords(user.password, userExists.password)) {
    throw new BadCredentialsException();
  }

  const token = generateToken({ id: userExists.id });

  return {
    token,
    user: userExists
  };
};

const findByEmail = (email) => {
  return userDao.findByEmail(email);
};

module.exports = {
  signUp,
  login
};
