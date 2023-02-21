const { Router } = require('express');
const { getProfile, updateUserProfile } = require('./userController');
const { validateJwt } = require('../../shared/middlewares/validateJWT');
const router = Router();

router
  .route('/profile')
  .get(validateJwt, getProfile)
  .put(validateJwt, updateUserProfile);

// admin routes
// router.route('/').get(validateJwt, isAdmin, getUsers);
// router.route('/:id')
//   .delete(validateJwt, isAdmin, deleteUser)
//   .get(validateJwt, isAdmin, getUserById)
//   .put(validateJwt, isAdmin, updateUser);

module.exports = {
  userRouter: router
};
