const connectDB = require('./src/config/db-config');
const config = require('config');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { app } = require('./app');
const PORT = config.get('port');

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.blue.underline.bold);
});
