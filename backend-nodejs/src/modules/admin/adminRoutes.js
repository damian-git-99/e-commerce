const { Router } = require('express');
const { validateJwt, isAdmin } = require('../../middlewares/validateJWT');
const { getUsers, deleteUser, getUserById, updateUser } = require('./adminController');
const router = Router();
// route /api/admin : de momento /api

// users /api/admin/users
router.route('/users').get(validateJwt, isAdmin, getUsers);
router.route('/users/:id')
  .delete(validateJwt, isAdmin, deleteUser)
  .get(validateJwt, isAdmin, getUserById)
  .put(validateJwt, isAdmin, updateUser);

// products /api/admin/products
// create product
// delete product
// update Product
// update Product Image

// orders /api/admin/orders
// update Order To Delivered
// get Orders

module.exports = {
  adminRouter: router
};
