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
}

module.exports = {
  UserService
};
