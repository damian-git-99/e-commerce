const { Router } = require('express');
const multer = require('multer');
const { isAdmin, validateJwt } = require('../../middlewares/validateJWT');
const { findAll, findById, deleteProduct, createProduct, updateProduct, createProductReview, updateProductImage } = require('./productControllers');
const router = Router();
const upload = multer();

// @route /api/products
router.route('/')
  .get(findAll)
  .post(validateJwt, isAdmin, createProduct);

router.route('/:id/reviews')
  .post(validateJwt, createProductReview);

router.route('/:id')
  .get(findById)
  .delete(validateJwt, isAdmin, deleteProduct)
  .put(validateJwt, isAdmin, updateProduct);

router.post('/image/upload/:id',
  [validateJwt, isAdmin, upload.single('image')],
  updateProductImage);

module.exports = {
  productRouter: router
};
