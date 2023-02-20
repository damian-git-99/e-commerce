const UserNotFoundException = require('./errors/UserNotFoundException');
const { encryptPassword } = require('../../shared/encrypt');
const { userDao } = require('./UserDao');
class UserService {
  findUserById(id) {
    return userDao.findById(id);
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
