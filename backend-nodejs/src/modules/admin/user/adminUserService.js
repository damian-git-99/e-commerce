const { encryptPassword } = require('../../../shared/encrypt');
const userDao = require('./adminUserDao');
const UserNotFoundException = require('../../../user/errors/UserNotFoundException');

const findUserById = (id) => {
  return userDao.findById(id);
};

const createUser = (user) => {
  user.password = encryptPassword(user.password);
  return userDao.save(user);
};

const findAllUsers = () => {
  return userDao.findAll();
};

const deleteUserById = (userId) => {
  return userDao.deleteUserById(userId);
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
  createUser,
  findAllUsers,
  deleteUserById,
  updateUser
};
