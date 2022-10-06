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

  /**
   * Find a user by their id and return the user without their password.
   * @param id - The id of the user you want to find.
   * @returns The user object
   */
  findById(id) {
    const user = UserModel.findById(id).select('-password');
    return user;
  }

  /**
   * Find all users and return them, but don't return their passwords.
   * @returns An array of users.
   */
  findAll() {
    const users = UserModel.find({}).select('-password');
    return users;
  }

  /**
   * It creates a new user and returns it
   * @param user - The user object that you want to save.
   * @returns The newUser is being returned.
   */
  save(user) {
    const newUser = UserModel.create(user);
    return newUser;
  }

  /**
   * It takes an id and newProperties, and then finds the user with that id and updates it with the
   * newProperties.
   * @param id - The id of the user you want to update.
   * @param newProperties - The new properties that you want to update the user with.
   * @returns The promise is being returned.
   */
  update(id, newProperties) {
    return UserModel.findByIdAndUpdate(id, newProperties, { new: true });
  }

  /**
   * @param userId - The id of the user to delete.
   * @returns A boolean value.
   */
  async deleteUserById(userId) {
    const user = await UserModel.findById(userId);

    if (user) {
      await user.remove();
      return true;
    }

    return false;
  }
}

const userRepository = new UserRepository();
module.exports = {
  userRepository
};
