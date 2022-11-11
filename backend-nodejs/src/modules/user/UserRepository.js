const UserModel = require('./UserModel');

class UserRepository {
  findByEmail(email) {
    const user = UserModel.findOne({ email });
    return user;
  }

  findById(id) {
    const user = UserModel.findById(id).select('-password');
    return user;
  }

  findAll() {
    const users = UserModel.find({}).select('-password');
    return users;
  }

  save(user) {
    const newUser = UserModel.create(user);
    return newUser;
  }

  update(id, newProperties) {
    return UserModel.findByIdAndUpdate(id, newProperties, { new: true });
  }

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
