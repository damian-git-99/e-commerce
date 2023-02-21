const { Router } = require('express');
const config = require('config');
const PAYPAL_CLIENT_ID = config.get('PAYPAL_CLIENT_ID');
const app = Router();

app.get('/api/config/paypal', (req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});

module.exports = app;
