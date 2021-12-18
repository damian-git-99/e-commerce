const { Router } = require('express');
const { authUser, getProfile, signUp, updateUserProfile } = require('../controllers/userController');
const { check } = require('express-validator');
const validateFields = require('../../../middlewares/expressValidator');
const { validateJwt } = require('../../../middlewares/validateJWT');
const router = Router();

// @route /api/users

router.post('/login', [
  check('email', 'el email no es valido').notEmpty().isEmail(),
  check('password', 'el password no puede estar vacio').notEmpty(),
  validateFields
], authUser);

router.post('/signup', [
  check('email', 'el email no es valido').notEmpty().isEmail(),
  check('password', 'el password no puede estar vacio').notEmpty(),
  check('name', 'El name no puede estar vacio').notEmpty(),
  validateFields
], signUp);

// router.get('/profile', [validateJwt], getProfile);
router
  .route('/profile')
  .get(validateJwt, getProfile)
  .put(validateJwt, updateUserProfile);

module.exports = {
  userRouter: router
};
