const { Router } = require('express');
const multer = require('multer');
const { validateJwt, isAdmin } = require('../utils/middlewares/validateJWT');
const { getOrders, updateOrderToDelivered } = require('./order/orderAdminController');
const { updateProductImage, createProduct, deleteProduct, updateProduct } = require('./product/adminProductController');
const { updateUser, deleteUser, getUserById, getUsers } = require('./user/adminUserController');
const router = Router();
const upload = multer();

// users
// users /api/admin/users
router.route('/users').get(validateJwt, isAdmin, getUsers);
router
  .route('/users/:id')
  .delete(validateJwt, isAdmin, deleteUser)
  .get(validateJwt, isAdmin, getUserById)
  .put(validateJwt, isAdmin, updateUser);

// products
// products /api/admin/products
router.route('/products').post(validateJwt, isAdmin, createProduct);
router
  .route('/products/:id')
  .delete(validateJwt, isAdmin, deleteProduct)
  .put(validateJwt, isAdmin, updateProduct);
router.post(
  '/products/image/upload/:id',
  [validateJwt, isAdmin, upload.single('image')],
  updateProductImage
);

// orders
// orders /api/orders
router.route('/orders')
  .get(validateJwt, isAdmin, getOrders);
router.route('/orders/:id/deliver')
  .put(validateJwt, isAdmin, updateOrderToDelivered);
module.exports = {
  adminRouter: router
};
