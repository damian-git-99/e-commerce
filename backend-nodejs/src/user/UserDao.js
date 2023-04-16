const UserModel = require('./UserModel');

const findById = (id) => {
  const user = UserModel.findById(id).select('-password');
  return user;
};

const update = (id, newProperties) => {
  return UserModel.findByIdAndUpdate(id, newProperties, { new: true });
};

module.exports = {
  findById, update
};
