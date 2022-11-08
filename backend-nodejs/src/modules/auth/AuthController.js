const asyncHandler = require('express-async-handler');
const { comparePasswords } = require('../../utils/encrypt');
const { generateToken } = require('../../utils/generateToken');
const BadCredentialsException = require('../user/errors/BadCredentialsException');
const EmailAlreadyTakenException = require('../user/errors/EmailAlreadyTakenException');
const { userService } = require('../user/userService');

// @route POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
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

// @route POST /api/users/signup
const signUp = asyncHandler(async (req, res) => {
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

module.exports = {
  authUser,
  signUp
};
