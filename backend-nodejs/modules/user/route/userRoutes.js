const { Router } = require('express');
const { authUser } = require('../controllers/userController');
const { check } = require('express-validator');
const validateFields = require('../../../middlewares/expressValidator');
const router = Router();

// @route /api/users
router.post('/login', [
  check('email', 'el email no es valido').notEmpty().isEmail(),
  check('password', 'el password no puede estar vacio').notEmpty(),
  validateFields
], authUser);

module.exports = {
  userRouter: router
};
