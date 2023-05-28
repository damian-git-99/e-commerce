const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../utils/middlewares/expressValidator');
const { login, signUp, renewToken } = require('./authController');
const { validateJwt } = require('../utils/middlewares/validateJWT');
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

router.get('/renew-token', validateJwt, renewToken);

module.exports = {
  authRouter: router
};
