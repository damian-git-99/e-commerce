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
  for (let i = 1; i <= size; i++) {
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
    const response = await request(app)
      .get(url)
      .query({ keyword: 'product4' })
      .send();
    expect(response.body.length).toBe(1);
  });
});

describe('find by id tests', () => {
  test('should return 404 when product does not exist', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await request(app).get(`${url}/${id}`).send();
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when product exists', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const response = await request(app).get(`${url}/${id}`).send();
    expect(response.statusCode).toBe(200);
  });
  test('should return product info when product exists', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const response = await request(app).get(`${url}/${id}`).send();
    expect(response.body).toEqual(
      expect.objectContaining({
        user: expect.any(String),
        name: expect.any(String),
        brand: expect.any(String),
        category: expect.any(String),
        description: expect.any(String),
        rating: expect.any(Number),
        numReviews: expect.any(Number),
        countInStock: expect.any(Number),
        price: expect.any(Number),
        reviews: expect.any(Array),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(String)
      })
    );
  });
});
