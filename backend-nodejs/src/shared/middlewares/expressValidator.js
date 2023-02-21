const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req = request, res = response, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return the first error
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(400).json({ message: firstError });
  }

  next();
};

module.exports = validateFields;
