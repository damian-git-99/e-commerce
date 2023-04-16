const UserModel = require('./UserModel');
const UserNotFoundException = require('./errors/UserNotFoundException');
const { encryptPassword } = require('../utils/encrypt');

const findUserById = (id) => {
  return UserModel.findById(id);
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

  return UserModel.findByIdAndUpdate(user.id, user, { new: true });
};

module.exports = {
  findUserById,
  updateUser
};
