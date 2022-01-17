import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteById(req.params.id);

  if (result) {
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
export const createProduct = asyncHandler(async (req, res) => {
  const product = {
    name: 'Sample name',
    price: 0,
    user: new mongoose.Types.ObjectId(req?.user?.id),
    image: '',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  };

  const createdProduct = await productService.create(product);
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await productService.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
