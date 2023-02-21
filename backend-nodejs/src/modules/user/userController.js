const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../../shared/generateToken');
const userService = require('./userService');

// @desc    Fetch User info
// @route   GET /api/users/profile
const getProfile = asyncHandler(async (req = request, res = response) => {
  const user = await userService.findUserById(req.user.id);
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  });
});

// @desc    Update User
// @route   PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = req.user;

  const updatedUser = await userService.updateUser(user, { name, email, password });

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken({ id: updatedUser.id })
  });
});

module.exports = {
  getProfile,
  updateUserProfile
};
