const userService = require('../../user/userService');
const { request, response } = require('express');
const config = require('config');
const KEY = config.get('JWT_SECRET');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const InvalidTokenException = require('../../auth/errors/InvalidTokenException');
const UserNotFoundException = require('../../user/errors/UserNotFoundException');
const UnauthorizedUserException = require('../../auth/errors/UnauthorizedUserException');

const validateJwt = asyncHandler(async (req = request, res = response, next) => {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new InvalidTokenException();
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const { id } = jwt.verify(token, KEY);
    const user = await userService.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    req.user = user;
    next();
  } catch (err) {
    throw new InvalidTokenException();
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new UnauthorizedUserException();
  }
};

module.exports = {
  validateJwt,
  isAdmin
};
