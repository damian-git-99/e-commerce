const connectDB = require('./config/db-config');
const bcrypt = require('bcryptjs');
const config = require('config');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const { app } = require('./app');
const UserModel = require('./modules/user/UserModel');
const PORT = config.get('port');

connectDB();

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`.blue.underline.bold);
  // import sample data
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true
    },
    {
      name: 'Damian galvan',
      email: 'damian@example.com',
      password: bcrypt.hashSync('123456', 10)
    },
    {
      name: 'jose torrez',
      email: 'jose@example.com',
      password: bcrypt.hashSync('123456', 10)
    }
  ];
  await UserModel.deleteMany();
  await UserModel.insertMany(users);
});
