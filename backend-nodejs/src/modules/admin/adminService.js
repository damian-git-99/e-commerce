const { userService } = require('../user/userService');

class AdminService {
  findAllUsers() {
    return userService.findAll();
  }

  findUserById(id) {
    return userService.findById(id);
  }

  deleteUserById(userId) {
    return userService.deleteUserById(userId);
  }

  updateUser(userId, newUser) {
    return userService.updateUser(userId, newUser);
  }
};
const adminService = new AdminService();

module.exports = {
  adminService
};
