const UserModel = require('./UserModel');

class UserRepository {
  /**
   * It takes an email as an argument and returns a user object
   * @param email - The email address of the user you want to find.
   * @returns The user object
   */
  findByEmail(email) {
    const user = UserModel.findOne({ email });
    return user;
  }
}

const userRepository = new UserRepository();
module.exports = {
  userRepository
};
