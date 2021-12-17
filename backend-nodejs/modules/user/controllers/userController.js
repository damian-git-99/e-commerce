const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { comparePasswords } = require('../../../utils/encrypt');
const { generateToken } = require('../../../utils/generateToken');
const { UserService } = require('../services/userService');
const userService = new UserService();

const authUser = asyncHandler(async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await userService.findByEmail(email);
  if (!user || !comparePasswords(password, user.password)) {
    res.status(401);
    throw new Error('bad credentials');
  }
  const key = process.env.JWT_SECRET;
  const token = generateToken({ id: user.id }, key);
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token
  });
});

module.exports = {
  authUser
};
