// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const products = require('./data/products');
const users = require('./data/users');
const OrderModel = require('./src/modules/order/OrderModel');
const ProductModel = require('./src/modules/product/ProductModel');
const UserModel = require('./src/modules/user/UserModel');
require('dotenv').config();
const connectDB = require('./db/config');

connectDB();

const importData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2]?.toLowerCase() === '-d') {
  destroyData();
} else {
  importData();
}
