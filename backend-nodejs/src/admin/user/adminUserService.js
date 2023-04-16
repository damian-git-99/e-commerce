const { encryptPassword } = require('../../utils/encrypt');
const UserNotFoundException = require('../../user/errors/UserNotFoundException');
const UserModel = require('../../user/UserModel');

const findUserById = (id) => {
  return UserModel.findById(id).select('-password');
};

const createUser = (user) => {
  user.password = encryptPassword(user.password);
  return UserModel.create(user);
};

const findAllUsers = () => {
  return UserModel.find({}).select('-password');
};

const deleteUserById = (userId) => {
  return UserModel.findByIdAndDelete(userId);
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
  createUser,
  findAllUsers,
  deleteUserById,
  updateUser
};
