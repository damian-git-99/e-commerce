import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  const passwordEncrypted = bcrypt.hashSync(password, salt);
  return passwordEncrypted;
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
