const bcrypt = require('bcryptjs');

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const passwordEncrypted = bcrypt.hashSync(password, salt);
  return passwordEncrypted;
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  encryptPassword,
  comparePasswords
};
