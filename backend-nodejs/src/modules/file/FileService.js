const cloudinary = require('cloudinary').v2;
const FileType = require('file-type');
const config = require('config');
const cloudinaryConfig = config.get('cloudinary');

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret
});

class FileService {
  async isSupportedFileType(buffer) {
    const type = await FileType.fromBuffer(buffer);
    return !type
      ? false
      : type.mime === 'image/png' || type.mime === 'image/jpeg';
  }

  uploadImage(file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'ecommerce' }, function (error, result) {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  deleteImage(publicId) {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_resources([publicId],
        function(error, result) {
          if (error) reject(error);
          resolve(result);
        });
    });
  }
}

const fileService = new FileService();
module.exports = fileService;
