const bcrypt = require('bcryptjs');

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

module.exports = users;
