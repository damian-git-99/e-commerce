const { Router } = require("express");
const ProductModel = require("../model/ProductModel");
const ProductService = require("../services/productService");
const asyncHandler = require('express-async-handler')
const router = Router();
const productService = new ProductService();

//@route /api/products

router.get("/", asyncHandler(async (req, res) => {
    const products = await productService.findAll();
    res.status(200).json(products);
}));

router.get("/:id", asyncHandler(async (req, res) => {
    
    const id = req.params.id;
    const product = await productService.findById(id);

    if (!product) {
        return res.status(404).json({
            error: `ERROR: no existe un producto con el id: ${id}`,
        });
    }

    return res.status(200).json(product);
}));


module.exports = {
    productRouter: router
};