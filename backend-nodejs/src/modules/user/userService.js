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
    return userRepository.findAll();
  }

  async deleteUser(userId) {
    const user = UserModel.findById(userId);

    if (user) {
      await user.remove();
      return true;
    }

    return false;
  }

  async updateUser(user, newUser) {
    const { name, email, password } = newUser;
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = encryptPassword(password);
    }

    return userRepository.update(user.id, user);
  }
}

module.exports = {
  UserService
};
