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

describe('Get My Orders Tests', () => {
  const getMyOrdersRequest = (token) => {
    return request(app).get(`${url}/myorders`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await getMyOrdersRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should return 200 when the orders were returned correctly', async () => {
    const token = await getToken();
    const response = await getMyOrdersRequest(token);
    expect(response.statusCode).toBe(200);
  });
});

describe('Get Order By Id tests', () => {
  const getOrderByIdRequest = (id, token) => {
    return request(app).get(`${url}/${id}`)
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
  test('should return 200 when order is returned correctly', async () => {
    const token = await getToken();
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await getOrderByIdRequest(order.id, token);
    expect(response.statusCode).toBe(200);
  });
});

describe('Update Order To Paid Tests', () => {
  const updateOrderToPaidRequest = (id, token, paymentResult) => {
    return request(app).put(`${url}/${id}/pay`)
      .set('Authorization', `Bearer ${token}`)
      .send(paymentResult);
  };
  test('should return 401 when token is not sent', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const response = await updateOrderToPaidRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 404 when order is not found', async () => {
    const id = '63276eb6b656271ef476fd1e';
    const token = await getToken();
    const response = await updateOrderToPaidRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when the order was updated', async () => {
    const paymentResult = {
      id: '1',
      status: 'paid',
      update_time: new Date(),
      email_address: 'damian@gmail.com'
    };
    const token = await getToken();
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await updateOrderToPaidRequest(order.id, token, paymentResult);
    expect(response.statusCode).toBe(200);
  });
  test('should update the order in the database', async () => {
    const paymentResult = {
      id: '1',
      status: 'paid',
      update_time: new Date(),
      email_address: 'damian@gmail.com'
    };
    const token = await getToken();
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    await updateOrderToPaidRequest(order.id, token, paymentResult);
    const updatedOrder = await OrderModel.findOne({});
    expect(updatedOrder.isPaid).toBeTruthy();
    expect(updatedOrder.paymentResult.id).toBe('1');
    expect(updatedOrder.paymentResult.status).toBe('paid');
  });
  test('should return the updated order in the body', async () => {
    const paymentResult = {
      id: '1',
      status: 'paid',
      update_time: new Date(),
      email_address: 'damian@gmail.com'
    };
    const token = await getToken();
    await createOrderToTheAuthenticatedUser();
    const order = await OrderModel.findOne({});
    const response = await updateOrderToPaidRequest(order.id, token, paymentResult);
    expect(response.body.isPaid).toBeTruthy();
    expect(response.body.paymentResult.id).toBe('1');
    expect(response.body.paymentResult.status).toBe('paid');
  });
});

// Admin
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

// admin
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
