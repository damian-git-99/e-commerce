const bcrypt = require('bcryptjs');

/**
 * It takes a password, and then encrypts the password using the salt.
 * @param password - The password to be encrypted.
 * @returns The passwordEncrypted variable is being returned.
 */
const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const passwordEncrypted = bcrypt.hashSync(password, salt);
  return passwordEncrypted;
};

/**
 * It compares the password with the hashed password.
 * @param password - The password that the user is trying to log in with.
 * @param hashedPassword - The hashed password that was stored in the database.
 * @returns The return value is a boolean.
 */
const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  encryptPassword,
  comparePasswords
};
