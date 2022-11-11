const UserNotFoundException = require('../../errors/UserNotFoundException');
const { encryptPassword } = require('../../utils/encrypt');
const { userRepository } = require('./UserRepository');
class UserService {
  findByEmail(email) {
    return userRepository.findByEmail(email);
  }

  findUserById(id) {
    return userRepository.findById(id);
  }

  createUser(user) {
    user.password = encryptPassword(user.password);
    return userRepository.save(user);
  }

  findAllUsers() {
    return userRepository.findAll();
  }

  async deleteUserById(userId) {
    return userRepository.deleteUserById(userId);
  }

  async updateUser(userId, newUser) {
    const user = await userService.findUserById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const { name, email, password } = newUser;
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = encryptPassword(password);
    }

    return userRepository.update(user.id, user);
  }
}

const userService = new UserService();

module.exports = {
  userService
};
