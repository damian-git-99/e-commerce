const { request, response } = require("express");
const ProductService = require("../services/productService");
const asyncHandler = require('express-async-handler');
const productService = new ProductService();

const findAll = asyncHandler(async (req = request, res = response) => {
    const products = await productService.findAll();
    res.status(200).json(products);
});

const findById = asyncHandler(async (req, res) => {

    const id = req.params.id;
    const product = await productService.findById(id);

    if (!product) {
        return res.status(404).json({
            error: `ERROR: no existe un producto con el id: ${id}`,
        });
    }

    return res.status(200).json(product);
})


module.exports = {
    findAll,
    findById
}