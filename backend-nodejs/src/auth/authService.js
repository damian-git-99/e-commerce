const UserModel = require('../user/UserModel');
const { encryptPassword, comparePasswords } = require('../utils/encrypt');
const { generateToken } = require('../utils/generateToken');
const BadCredentialsException = require('./errors/BadCredentialsException');
const EmailAlreadyTakenException = require('./errors/EmailAlreadyTakenException');

const signUp = async (user) => {
  const userExists = await findByEmail(user.email);
  if (userExists) {
    throw new EmailAlreadyTakenException();
  }
  user.password = encryptPassword(user.password);
  user = await UserModel.create(user);
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
  return UserModel.findOne({ email });
};

module.exports = {
  signUp,
  login
};
