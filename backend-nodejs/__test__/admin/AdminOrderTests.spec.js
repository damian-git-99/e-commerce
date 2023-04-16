const request = require('supertest');
const { app } = require('../../src/app');
const OrderModel = require('../../src/order/OrderModel');
const UserModel = require('../../src/user/UserModel');
const { encryptPassword } = require('../../src/utils/encrypt');
const { clearDatabase, connect, closeDatabase } = require('../config/db');
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

const createOrderToTheAuthenticatedUser = async () => {
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
    isPaid: false,
    paidAt: new Date(),
    isDelivered: false,
    deliveredAt: new Date()
  };
  await OrderModel.create(order);
};

describe('Get All Orders Tests', () => {
  const getAllOrderRequest = (token) => {
    return request(app).get(url)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await getAllOrderRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when the authenticated user is not admin', async () => {
    const token = await getToken();
    const response = await getAllOrderRequest(token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 200 when the orders were returned correctly', async() => {
    const token = await getToken(true);
    const response = await getAllOrderRequest(token);
    expect(response.statusCode).toBe(200);
  });
});

describe('Update Order To Delivered Tests', () => {
  const updateOrderToDeliveredRequest = (id, token) => {
    return request(app).put(`${url}/${id}/deliver`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await updateOrderToDeliveredRequest(id);
    expect(response.status).toBe(401);
  });
  test('should return 403 when the authenticated user is not admin', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken();
    const response = await updateOrderToDeliveredRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when Order In not Found', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken(true);
    const response = await updateOrderToDeliveredRequest(id, token);
    expect(response.status).toBe(404);
  });
  test('should return 200 when the order was updated', async () => {
    const token = await getToken(true);
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await updateOrderToDeliveredRequest(order.id, token);
    expect(response.status).toBe(200);
  });
  test('should update the order in the database', async () => {
    const token = await getToken(true);
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    await updateOrderToDeliveredRequest(order.id, token);
    const updatedOrder = await OrderModel.findOne({});
    expect(updatedOrder.isDelivered).toBeTruthy();
  });
  test('should return the updated order in the body', async () => {
    const token = await getToken(true);
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await updateOrderToDeliveredRequest(order.id, token);
    expect(response.body.isDelivered).toBeTruthy();
  });
});
