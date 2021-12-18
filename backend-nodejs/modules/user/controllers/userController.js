const { request, response } = require('express');
const asyncHandler = require('express-async-handler');
const { comparePasswords, encryptPassword } = require('../../../utils/encrypt');
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

const signUp = asyncHandler(async (req = request, res = response) => {
  const { email, name, password } = req.body;
  const user = await userService.findByEmail(email);

  if (user) {
    res.status(400);
    throw new Error('Email is already taken');
  }

  const newUser = await userService.save({
    email,
    name,
    password: encryptPassword(password)
  });
  if (!newUser) {
    res.status(400);
    throw new Error('Bad request data');
  }
  const key = process.env.JWT_SECRET;
  const token = generateToken({ id: newUser.id }, key);
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

module.exports = {
  authUser,
  getProfile,
  signUp
};
