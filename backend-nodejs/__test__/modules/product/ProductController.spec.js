const request = require('supertest');
const { app } = require('../../../app');
const fileService = require('../../../src/modules/file/FileService');
const ProductModel = require('../../../src/modules/product/ProductModel');
const UserModel = require('../../../src/modules/user/UserModel');
const { encryptPassword } = require('../../../src/utils/encrypt');
const { clearDatabase, connect, closeDatabase } = require('../../config/db');
const { loadFile } = require('../utils/Utils');
const url = '/api/products';
jest.mock('../../../src/modules/file/FileService');
const fileServiceMocked = jest.mocked(fileService, true);

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

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

describe('delete product tests', () => {
  const deleteProductByIdRequest = (id, token) => {
    return request(app)
      .delete(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await deleteProductByIdRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken();
    const response = await deleteProductByIdRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when product does not exist', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken(true);
    const response = await deleteProductByIdRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when product was deleted', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const token = await getToken(true);
    const response = await deleteProductByIdRequest(id, token);
    expect(response.statusCode).toBe(200);
  });
  test('should delete the product from the db', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    const id = product.id;
    const token = await getToken(true);
    await deleteProductByIdRequest(id, token);
    const deletedProduct = await ProductModel.findOne({ name: 'product1' });
    expect(deletedProduct).toBeFalsy();
  });
});

describe('create produt tests', () => {
  const createProductRequest = (token) => {
    return request(app).post(url)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await createProductRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await createProductRequest(token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 201 when a new product is created', async () => {
    const token = await getToken(true);
    const response = await createProductRequest(token);
    expect(response.statusCode).toBe(201);
  });
});

describe('Update product', () => {
  const updateproductRequest = (id, token, product) => {
    return request(app).put(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .send();
  };
  let id = '63276eb6b656271ef476fd1e';
  test('should return 401 when token is not sent', async () => {
    const response = await updateproductRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await updateproductRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when product is not found', async () => {
    const token = await getToken(true);
    const response = await updateproductRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when product is updated', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    const newProduct = {
      name: 'product1_updated',
      price: 100.99,
      description: 'new description',
      brand: 'Apple',
      category: 'Cellphone',
      countInStock: 12
    };
    const response = await updateproductRequest(id, token, newProduct);
    expect(response.statusCode).toBe(200);
  });
  test('should update the product in the db when product is updated', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    await request(app).put(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'product1_updated',
        price: 100.99,
        description: 'new description',
        brand: 'Apple',
        category: 'Cellphone',
        countInStock: 12
      });
    const updatedProduct = await ProductModel.findById(id);
    expect(updatedProduct.name).toBe('product1_updated');
    expect(updatedProduct.price).toBe(100.99);
    expect(updatedProduct.description).toBe('new description');
  });
});

describe('update Image tests', () => {
  let id = '63276eb6b656271ef476fd1e';
  const updateImageRequest = (id, token, file) => {
    return request(app).post(`${url}/image/upload/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('image', file);
  };
  test('should return 401 when token is not sent', async () => {
    const response = await updateImageRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await updateImageRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 400 when image is not sent', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    const response = await updateImageRequest(id, token);
    expect(response.statusCode).toBe(400);
  });
  test('should return 400 Image not supported when invalid file is sent', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    const file = await loadFile('invalid_file.txt');
    const response = await updateImageRequest(id, token, file);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Image not supported');
  });
  test('should return 404 when product does not exist', async () => {
    const token = await getToken(true);
    const file = await loadFile();
    fileServiceMocked.isSupportedFileType.mockReturnValue(true);
    const response = await updateImageRequest(id, token, file);
    expect(response.statusCode).toBe(404);
  });
  test('should call uploadService', async () => {
    await createProducts(1);
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    const file = await loadFile();
    fileServiceMocked.isSupportedFileType.mockReturnValue(true);
    fileServiceMocked.uploadImage.mockReturnValue({
      url: 'new_image_url',
      public_id: 'ABC-123'
    });
    await updateImageRequest(id, token, file);
    expect(fileServiceMocked.deleteImage).toHaveBeenCalledTimes(0);
    expect(fileServiceMocked.uploadImage).toHaveBeenCalledTimes(1);
  });
  test('should call delete image if the product has a previous image', async () => {
    await createProducts(1, 'http://localhost/imagen');
    const product = await ProductModel.findOne({ name: 'product1' });
    id = product.id;
    const token = await getToken(true);
    const file = await loadFile();
    fileServiceMocked.isSupportedFileType.mockReturnValue(true);
    fileServiceMocked.uploadImage.mockReturnValue({
      url: 'new_image_url',
      public_id: 'ABC-123'
    });
    await updateImageRequest(id, token, file);
    expect(fileServiceMocked.deleteImage).toHaveBeenCalledTimes(1);
  });
});
