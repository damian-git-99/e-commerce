const UserModel = require('../model/UserModel');

class UserService {
  findByEmail(email) {
    const user = UserModel.findOne({ email });
    return user;
  }

  findById(id) {
    const user = UserModel.findById(id).select('-password');
    return user;
  }

  save(user) {
    const newUser = UserModel.create(user);
    return newUser;
  }
}

module.exports = {
  UserService
};
