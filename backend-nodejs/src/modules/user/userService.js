const { encryptPassword } = require('../shared/utils/encrypt');
const UserModel = require('./UserModel');
const { userRepository } = require('./UserRepository');
class UserService {
  findByEmail(email) {
    return userRepository.findByEmail(email);
  }

  findById(id) {
    return userRepository.findById(id);
  }

  save(user) {
    user.password = encryptPassword(user.password);
    return userRepository.save(user);
  }

  findAll() {
    const users = UserModel.find({}).select('-password');
    return users;
  }

  async deleteUser(userId) {
    const user = UserModel.findById(userId);

    if (user) {
      await user.remove();
      return true;
    }

    return false;
  }
}

module.exports = {
  UserService
};
