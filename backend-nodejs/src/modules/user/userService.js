const UserNotFoundException = require('./errors/UserNotFoundException');
const { encryptPassword } = require('../../shared/encrypt');
const { userDao } = require('./UserDao');
class UserService {
  findByEmail(email) {
    return userDao.findByEmail(email);
  }

  findUserById(id) {
    return userDao.findById(id);
  }

  createUser(user) {
    user.password = encryptPassword(user.password);
    return userDao.save(user);
  }

  findAllUsers() {
    return userDao.findAll();
  }

  async deleteUserById(userId) {
    return userDao.deleteUserById(userId);
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

    return userDao.update(user.id, user);
  }
}

const userService = new UserService();

module.exports = {
  userService
};
