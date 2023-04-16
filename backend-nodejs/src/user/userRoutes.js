const { Router } = require('express');
const { getProfile, updateUserProfile } = require('./userController');
const { validateJwt } = require('../utils/middlewares/validateJWT');

const router = Router();

router
  .route('/profile')
  .get(validateJwt, getProfile)
  .put(validateJwt, updateUserProfile);

module.exports = {
  userRouter: router
};
