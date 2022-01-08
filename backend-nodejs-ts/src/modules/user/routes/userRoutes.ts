import { Router } from 'express';
import {
  authUser,
  signUp,
  getProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/UserController';
import { isAdmin, validateJwt } from '../../../middlewares/validateJWT';

export const userRouter = Router();

userRouter.post('/login', authUser);
userRouter.post('/signup', signUp);
userRouter
  .route('/profile')
  .get(validateJwt, getProfile)
  .put(validateJwt, updateUserProfile);

userRouter.route('/').get(validateJwt, isAdmin, getUsers);
userRouter
  .route('/:id')
  .delete(validateJwt, isAdmin, deleteUser)
  .get(validateJwt, isAdmin, getUserById)
  .put(validateJwt, isAdmin, updateUser);
