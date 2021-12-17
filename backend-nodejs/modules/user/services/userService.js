const UserModel = require('../model/UserModel');

class UserService {
  findByEmail(email) {
    const user = UserModel.findOne({ email });
    return user;
  }
}

module.exports = {
  UserService
};
