const { UserService } = require('../modules/user/services/userService');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userService = new UserService();

const validateJwt = asyncHandler(async (req = request, res = response, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('invalid token');
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.findById(id);

    if (!user) {
      res.status(404);
      throw new Error('user not found');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('invalid token: ' + err);
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = {
  validateJwt,
  isAdmin
};
