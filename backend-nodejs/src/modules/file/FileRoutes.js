const express = require('express');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const InvalidImageException = require('./errors/InvalidImageException');
const productService = require('../product/productService');
const ProductNotFoundException = require('../product/errors/ProductNotFoundException');
const fileService = require('./FileService');
const router = express.Router();

const upload = multer();

router.post(
  '/:id',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new InvalidImageException('an image does not come');
    }

    if (!fileService.isSupportedFileType(req.file.buffer)) {
      throw new InvalidImageException('Image not supported');
    }

    const product = await productService.findById(req.params.id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    if (product.image.trim() !== '') {
      // delete previous image
      await fileService.deleteImage(product.public_id_image);
    }

    const result = await fileService.uploadImage(req.file);
    product.public_id_image = result.public_id;
    await product.save();
    res.send(result.url);
  })
);

module.exports = {
  uploadRoutes: router
};
