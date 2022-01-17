import { Router } from "express";
import { findAll, findById, createProduct, deleteProduct, updateProduct } from '../controllers/ProductController';
import { validateJwt, isAdmin } from '../../../middlewares/validateJWT';
export const productRouter = Router();

productRouter.route('/').get(findAll).post(validateJwt, isAdmin, createProduct);
productRouter
  .route('/:id')
  .get(findById)
  .delete(validateJwt, isAdmin, deleteProduct)
  .put(validateJwt, isAdmin, updateProduct);


