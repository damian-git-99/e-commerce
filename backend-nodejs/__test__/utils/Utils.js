const path = require('path');
const fs = require('fs');

const loadFile = async (filename = 'photo.jpg') => {
  const filePath = path.join(__dirname, filename);
  const file = await fs.createReadStream(filePath);
  return file;
};

module.exports = {
  loadFile
};
