const path = require('path');
const express = require('express');
const multer = require('multer');
const productService = require('../product/productService');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

function checkFileType(file, callback) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) return callback(null, true);
  else {
    // eslint-disable-next-line node/no-callback-literal
    callback('Images only!');
  }
}

async function deletePreviousImage(req, callback) {
  try {
    const product = await productService.findById(req.params.id);
    console.log(product.image);
    console.error(req.params);
    if (!product.image || product.image === '') {
      return true;
    }
    fs.unlinkSync(product.image);
    return true;
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line node/no-callback-literal
    callback('error');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
    deletePreviousImage(req, callback);
  }
});

router.post('/:id', upload.single('image'), async (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = {
  uploadRoutes: router
};
