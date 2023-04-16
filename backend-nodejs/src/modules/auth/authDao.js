const UserModel = require('../../user/UserModel');

const findByEmail = (email) => {
  const user = UserModel.findOne({ email });
  return user;
};

const save = (user) => {
  const newUser = UserModel.create(user);
  return newUser;
};

module.exports = {
  findByEmail,
  save
};
