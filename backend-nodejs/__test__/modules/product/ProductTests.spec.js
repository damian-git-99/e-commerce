const request = require('supertest');
const { app } = require('../../../src/app');
const ProductModel = require('../../../src/product/ProductModel');
const UserModel = require('../../../src/user/UserModel');
const { encryptPassword } = require('../../../src/shared/encrypt');
const { clearDatabase, connect, closeDatabase } = require('../../config/db');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const url = '/api/products';

const createProducts = async (size = 10, image = '') => {
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image
    };
    await ProductModel.create(product);
  }
};

const validUser = {
  name: 'damian',
  email: 'damian@gmail.com',
  password: encryptPassword('1234')
};

const requestAuth = (userData) => {
  return request(app).post('/api/users/login').send(userData);
};

const createUserInDB = (user = validUser, isAdmin) => {
  return UserModel.create({ ...user, isAdmin });
};

const getToken = async (isAdmin = false) => {
  await createUserInDB(validUser, isAdmin);
  const response = await requestAuth({
    email: 'damian@gmail.com',
    password: '1234'
  });
  return response.body.token;
};

describe('find all tests', () => {
  const findAllProductsRequest = (query = {}) => {
    return request(app)
      .get(url)
      .query(query)
      .send();
  };
  test('should return 200', async () => {
    const response = await findAllProductsRequest();
    expect(response.statusCode).toBe(200);
  });
  test('should return 10 products', async () => {
    await createProducts();
    const response = await await findAllProductsRequest();
    expect(response.body.length).toBe(10);
  });
  test('should return only the products that matches the keyword sent', async () => {
    await createProducts();
    const response = await findAllProductsRequest({ keyword: 'product4' });
    expect(response.body.length).toBe(1);
  });
});

describe('find by id tests', () => {
  const findProductByIdRequest = (id) => {
    return request(app).get(`${url}/${id}`).send();
  };

  test('should return 404 when product does not exist', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await findProductByIdRequest(id);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when product exists', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const response = await findProductByIdRequest(id);
    expect(response.statusCode).toBe(200);
  });
  test('should return product info when product exists', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const response = await findProductByIdRequest(id);
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

describe('create Product Review Tests', () => {
  const id = '63276eb6b656271ef476fd1e';
  const createProductReviewRequest = (id, token, review) => {
    return request(app)
      .post(`${url}/${id}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send(review);
  };
  test('should return 401 when token is not sent', async () => {
    const response = await createProductReviewRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 404 when product is not found', async () => {
    const token = await getToken();
    const response = await createProductReviewRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 400 when the product has already been reviewed by the authenticated user', async () => {
    const token = await getToken();
    const authenticatedUser = await UserModel.findOne({ email: 'damian@gmail.com' });
    const product = await ProductModel.create({
      user: authenticatedUser.id,
      name: 'product1_updated',
      price: 100.99,
      description: 'new description',
      brand: 'Apple',
      category: 'Cellphone',
      countInStock: 12
    });
    const review = {
      name: authenticatedUser.name,
      rating: 5,
      comment: 'comment about the product',
      user: authenticatedUser.id
    };
    await product.reviews.push(review);
    await product.save();
    const newReview = {
      rating: 4,
      comment: 'new Review'
    };
    const response = await createProductReviewRequest(product.id, token, newReview);
    expect(response.statusCode).toBe(400);
  });
  test('should return Product already reviewed when the product has already been reviewed by the authenticated user', async () => {
    const token = await getToken();
    const authenticatedUser = await UserModel.findOne({ email: 'damian@gmail.com' });
    const product = await ProductModel.create({
      user: authenticatedUser.id,
      name: 'product1_updated',
      price: 100.99,
      description: 'new description',
      brand: 'Apple',
      category: 'Cellphone',
      countInStock: 12
    });
    const review = {
      name: authenticatedUser.name,
      rating: 5,
      comment: 'comment about the product',
      user: authenticatedUser.id
    };
    await product.reviews.push(review);
    await product.save();
    const newReview = {
      rating: 4,
      comment: 'new Review'
    };
    const response = await createProductReviewRequest(product.id, token, newReview);
    expect(response.body.message).toBe('Product already reviewed');
  });
  test('should return 201 when a review is created on a product', async () => {
    const token = await getToken();
    const authenticatedUser = await UserModel.findOne({ email: 'damian@gmail.com' });
    const product = await ProductModel.create({
      user: authenticatedUser.id,
      name: 'product1_updated',
      price: 100.99,
      description: 'new description',
      brand: 'Apple',
      category: 'Cellphone',
      countInStock: 12
    });
    const newReview = {
      rating: 4,
      comment: 'new Review'
    };
    const response = await createProductReviewRequest(product.id, token, newReview);
    expect(response.statusCode).toBe(201);
  });
});
