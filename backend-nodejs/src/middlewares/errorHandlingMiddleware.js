// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.status) {
    statusCode = err.status;
  }
  console.error(err);
  res.status(statusCode).json({
    message: err.message
  });
};

module.exports = {
  errorHandler
};
