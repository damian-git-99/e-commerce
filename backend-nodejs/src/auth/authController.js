const asyncHandler = require('express-async-handler');
const authService = require('./authService');
const { generateToken } = require('../utils/generateToken');

// @route POST /api/users/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login({ email, password });
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

  const { token, user } = await authService.signUp({
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

// @route GET /api/users/renew-token
const renewToken = asyncHandler(async (req, res) => {
  const user = req.user;
  const token = generateToken({ id: user.id });
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token
  });
});

module.exports = {
  login,
  signUp,
  renewToken
};
