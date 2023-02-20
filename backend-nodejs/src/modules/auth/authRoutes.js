const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../../middlewares/expressValidator');
const { authUser, signUp } = require('./authController');
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

module.exports = {
  authRouter: router
};
