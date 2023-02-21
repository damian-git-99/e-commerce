const { Router } = require('express');
const config = require('config');
const { validateJwt } = require('../../shared/middlewares/validateJWT');
const PAYPAL_CLIENT_ID = config.get('PAYPAL_CLIENT_ID');
const app = Router();

app.get('/api/config/paypal', validateJwt, (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});

module.exports = app;
