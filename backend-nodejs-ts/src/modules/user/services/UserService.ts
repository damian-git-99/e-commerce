import { User, UserModel } from '../models/UserModel';

class UserService {
  public findByEmail(email: string) {
    const user = UserModel.findOne({ email });
    return user;
  }

  public save(user: User) {
    const newUser = UserModel.create(user);
    return newUser;
  }

  public findById(id: string) {
    const user = UserModel.findById(id).select('-password');
    return user;
  }

  public findAll() {
    const users = UserModel.find({}).select('-password');
    return users;
  }

  public async deleteUser(userId: string) {
    const user = UserModel.findById(userId);

    if (user) {
      await user.remove();
      return true;
    }

    return false;
  }
}

export const userService = new UserService();
