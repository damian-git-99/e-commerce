const UserNotFoundException = require('./errors/UserNotFoundException');
const { encryptPassword } = require('../../shared/encrypt');
const userDao = require('./UserDao');

const findUserById = (id) => {
  return userDao.findById(id);
};

const updateUser = async (userId, newUser) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new UserNotFoundException();
  }

  const { name, email, password } = newUser;
  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = encryptPassword(password);
  }

  return userDao.update(user.id, user);
};

module.exports = {
  findUserById,
  updateUser
};
