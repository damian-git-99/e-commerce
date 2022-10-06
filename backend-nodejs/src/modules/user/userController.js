const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const UserNotFoundException = require('../../errors/UserNotFoundException');
const {
  comparePasswords
} = require('../shared/utils/encrypt');
const { generateToken } = require('../shared/utils/generateToken');
const BadCredentialsException = require('./errors/BadCredentialsException');
const EmailAlreadyTakenException = require('./errors/EmailAlreadyTakenException');
const { UserService } = require('./userService');
const userService = new UserService();

const authUser = asyncHandler(async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await userService.findByEmail(email);
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

const signUp = asyncHandler(async (req = request, res = response) => {
  const { email, name, password } = req.body;
  const user = await userService.findByEmail(email);

  if (user) {
    throw new EmailAlreadyTakenException();
  }

  const newUser = await userService.save({
    email,
    name,
    password
  });

  const token = generateToken({ id: newUser.id });

  return res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token
  });
});

// @desc    Fetch User info
// @route   GET /api/users/profile
const getProfile = asyncHandler(async (req = request, res = response) => {
  const user = await userService.findById(req.user.id);
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

// Admin routes
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
  authUser,
  getProfile,
  signUp,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};
