const { Router } = require('express');
const multer = require('multer');
const { validateJwt, isAdmin } = require('../../middlewares/validateJWT');
const {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductImage,
  getOrders,
  updateOrderToDelivered
} = require('./adminController');
const router = Router();
const upload = multer();
// route /api/admin : de momento /api

// users /api/admin/users
router.route('/users').get(validateJwt, isAdmin, getUsers);
router
  .route('/users/:id')
  .delete(validateJwt, isAdmin, deleteUser)
  .get(validateJwt, isAdmin, getUserById)
  .put(validateJwt, isAdmin, updateUser);

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

// orders /api/orders
router.route('/orders')
  .get(validateJwt, isAdmin, getOrders);

router.route('/orders/:id/deliver')
  .put(validateJwt, isAdmin, updateOrderToDelivered);

module.exports = {
  adminRouter: router
};
