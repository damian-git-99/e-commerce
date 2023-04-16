const UserModel = require('../../../user/UserModel');

const findById = (id) => {
  const user = UserModel.findById(id).select('-password');
  return user;
};

const findAll = () => {
  const users = UserModel.find({}).select('-password');
  return users;
};

const save = (user) => {
  const newUser = UserModel.create(user);
  return newUser;
};

const update = (id, newProperties) => {
  return UserModel.findByIdAndUpdate(id, newProperties, { new: true });
};

const deleteUserById = async (userId) => {
  const user = await UserModel.findById(userId);

  if (user) {
    await user.remove();
    return true;
  }

  return false;
};

module.exports = {
  findById,
  findAll,
  save,
  update,
  deleteUserById
};
