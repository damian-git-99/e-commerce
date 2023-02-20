const asyncHandler = require('express-async-handler');
const { comparePasswords } = require('../../shared/encrypt');
const { generateToken } = require('../../shared/generateToken');
const BadCredentialsException = require('./errors/BadCredentialsException');
const authService = require('./authService');

// @route POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findByEmail(email);
  if (!user || !comparePasswords(password, user.password)) {
    throw new BadCredentialsException();
  }
  const token = generateToken({ id: user.id });
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token
  });
});

// @route POST /api/users/signup
const signUp = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const { token, user } = await authService.createUser({
    email,
    name,
    password
  });

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token
  });
});

module.exports = {
  authUser,
  signUp
};
