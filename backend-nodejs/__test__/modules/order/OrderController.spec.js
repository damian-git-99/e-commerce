const request = require('supertest');
const { app } = require('../../../app');
const OrderModel = require('../../../src/modules/order/OrderModel');
const UserModel = require('../../../src/modules/user/UserModel');
const { encryptPassword } = require('../../../src/utils/encrypt');
const { clearDatabase, connect, closeDatabase } = require('../../config/db');
const url = '/api/orders';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

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

const createOrderToTheAuthenticatedUser = async (size = 1) => {
  const user = await UserModel.findOne({ email: 'damian@gmail.com' });
  const shippingAddress = {
    address: 'street #4',
    city: 'SLP',
    postalCode: '45678',
    country: 'MX'
  };
  const order = {
    user: user.id,
    shippingAddress,
    paymentMethod: 'paypal',
    paymentResult: {},
    taxPrice: 16,
    shippingPrice: 100,
    totalPrice: 116,
    isPaid: true,
    paidAt: new Date(),
    isDelivered: true,
    deliveredAt: new Date()
  };
  await OrderModel.create(order);
};

describe('Get Order By Id Tests', () => {
  const getOrderByIdRequest = (id, token) => {
    return request(app)
      .get(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await getOrderByIdRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 404 when the order is not found', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken();
    const response = await getOrderByIdRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when the order is found', async () => {
    const token = await getToken();
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await getOrderByIdRequest(order.id, token);
    expect(response.statusCode).toBe(200);
  });
});
