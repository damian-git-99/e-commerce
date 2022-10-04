const { Router } = require('express');
const { authUser, getProfile, signUp, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('./userController');
const { check } = require('express-validator');
const validateFields = require('../../middlewares/expressValidator');
const { validateJwt, isAdmin } = require('../../middlewares/validateJWT');
const router = Router();

// @route /api/users

router.post('/login', [
  check('email', 'The email is not valid').notEmpty().isEmail(),
  check('password', 'The password cannot be empty').notEmpty(),
  validateFields
], authUser);

router.post('/signup', [
  check('email', 'The email is not valid').notEmpty().isEmail(),
  check('password', 'The password cannot be empty').notEmpty(),
  check('name', 'The name cannot be empty').notEmpty(),
  validateFields
], signUp);

// router.get('/profile', [validateJwt], getProfile);
router
  .route('/profile')
  .get(validateJwt, getProfile)
  .put(validateJwt, updateUserProfile);

// admin routes
router.route('/').get(validateJwt, isAdmin, getUsers);
router.route('/:id')
  .delete(validateJwt, isAdmin, deleteUser)
  .get(validateJwt, isAdmin, getUserById)
  .put(validateJwt, isAdmin, updateUser);

module.exports = {
  userRouter: router
};
