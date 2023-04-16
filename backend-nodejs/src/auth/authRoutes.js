const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../utils/middlewares/expressValidator');
const { login, signUp } = require('./authController');
const router = Router();

// @route /api/users
router.post('/login', [
  check('email', 'The email is not valid').notEmpty().isEmail(),
  check('password', 'The password cannot be empty').notEmpty(),
  validateFields
], login);

router.post('/signup', [
  check('email', 'The email is not valid').notEmpty().isEmail(),
  check('password', 'The password cannot be empty').notEmpty(),
  check('name', 'The name cannot be empty').notEmpty(),
  validateFields
], signUp);

module.exports = {
  authRouter: router
};
