import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { productService } from '../services/ProductService';

export const findAll = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.findAll();
  res.status(200).json(products);
});

export const findById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await productService.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});
