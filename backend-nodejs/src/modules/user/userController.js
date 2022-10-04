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

const getProfile = asyncHandler(async (req = request, res = response) => {
  const user = await userService.findById(req.user.id);
  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  });
});

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

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);

  if (result) {
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (!user) {
    throw new UserNotFoundException();
  }

  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
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
