const connectDB = require('./config/db-config');
const config = require('config');
// eslint-disable-next-line no-unused-vars
require('colors');
const { app } = require('./app');
const { importData } = require('./seeder');
const PORT = config.get('port');

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`.blue.underline.bold);
  await connectDB();
  await importData();
});
