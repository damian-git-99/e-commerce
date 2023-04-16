// eslint-disable-next-line no-unused-vars
require('colors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const UserModel = require('./user/UserModel');

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

const importData = async () => {
  try {
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
    console.log('Data Imported!'.green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

module.exports = {
  importData
};
