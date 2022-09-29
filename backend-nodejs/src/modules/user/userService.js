const UserModel = require('./UserModel');
const { userRepository } = require('./UserRepository');
class UserService {
  findByEmail(email) {
    return userRepository.findByEmail(email);
  }

  findById(id) {
    const user = UserModel.findById(id).select('-password');
    return user;
  }

  save(user) {
    const newUser = UserModel.create(user);
    return newUser;
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
