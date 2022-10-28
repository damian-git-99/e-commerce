const asyncHandler = require('express-async-handler');
const UserNotFoundException = require('../../../errors/UserNotFoundException');
const { userService } = require('../userService');

// @desc    Fetch All users
// @route   GET /api/users/
const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);

  if (!result) {
    throw new UserNotFoundException();
  }

  res.json({ message: 'User removed' });
});

// @desc    Fetch User
// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (!user) {
    throw new UserNotFoundException();
  }

  res.json(user);
});

// @desc    Update User
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (!user) {
    throw new UserNotFoundException();
  }

  const updatedUser = await userService.updateUser(user, { ...req.body });

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin
  });
});

module.exports = {
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};