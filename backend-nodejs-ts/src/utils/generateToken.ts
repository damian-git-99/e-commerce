import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  const KEY = process.env.JWT_SECRET || '';
  const token = jwt.sign({ ...payload }, KEY, { expiresIn: '2h' });
  return token;
};
