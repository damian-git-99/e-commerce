import path from 'path';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { productService } from '../product/services/ProductService';
export const uploadRoutes = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: Express.Multer.File, callback: Function) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) return callback(null, true);
  else {
    // eslint-disable-next-line node/no-callback-literal
    callback('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
});

uploadRoutes.post('/:id', upload.single('image'), async (req, res) => {
  res.send(`/${req?.file?.path}`);
});
