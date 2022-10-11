const request = require('supertest');
const { app } = require('../../../app');
const ProductModel = require('../../../src/modules/product/ProductModel');
const UserModel = require('../../../src/modules/user/UserModel');
const { clearDatabase, connect, closeDatabase } = require('../../config/db');
const url = '/api/products';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const createProducts = async (size = 10) => {
  const user = await UserModel.create({
    name: 'damian',
    password: '123',
    email: 'damian@email.com'
  });
  for (let i = 0; i < size; i++) {
    const product = {
      user: user,
      name: `product${i}`,
      brand: 'mx',
      category: 'category',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    await ProductModel.create(product);
  }
};

describe('find all tests', () => {
  test('should return 200', async () => {
    const response = await request(app).get(url).send();
    expect(response.statusCode).toBe(200);
  });
  test('should return 10 products', async () => {
    await createProducts();
    const response = await request(app).get(url).send();
    expect(response.body.length).toBe(10);
  });
  test('should return only the products that matches the keyword sent', async () => {
    await createProducts();
    const response = await request(app).get(url)
      .query({ keyword: 'product4' })
      .send();
    expect(response.body.length).toBe(1);
  });
});
