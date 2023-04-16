const request = require('supertest');
const { app } = require('../../../src/app');
const UserModel = require('../../../src/user/UserModel');
const {
  encryptPassword
} = require('../../../src/shared/encrypt');
const { clearDatabase, connect, closeDatabase } = require('../../config/db');
const url = '/api/users';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const requestAuth = (userData) => {
  return request(app).post(`${url}/login`).send(userData);
};

const validUser = {
  name: 'damian',
  email: 'damian@gmail.com',
  password: encryptPassword('1234')
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

describe('Get Profile Tests', () => {
  const getProfileDetailsRequest = (token) => {
    return request(app)
      .get(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await getProfileDetailsRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should return 200 when token is sent', async () => {
    const token = await getToken();
    const response = await getProfileDetailsRequest(token);
    expect(response.statusCode).toBe(200);
  });
  test('should return user info when token is sent', async () => {
    const token = await getToken();
    const response = await getProfileDetailsRequest(token);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        isAdmin: expect.any(Boolean)
      })
    );
  });
});

describe('Update User Profile Tests', () => {
  const updateUserProfileRequest = (token, user = {}) => {
    const { name, email } = user;
    return request(app)
      .put(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name,
        email
      });
  };
  test('should return 401 when token is not sent', async () => {
    const response = await updateUserProfileRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should update the user name when token is sent', async () => {
    const token = await getToken();
    const response = await updateUserProfileRequest(token, {
      name: 'damian 2',
      email: 'damian2@gmail.com'
    });
    expect(response.body.name).toBe('damian 2');
  });
  test('should update the user email when token is sent', async () => {
    const token = await getToken();
    const response = await updateUserProfileRequest(token, {
      name: 'damian 2',
      email: 'damian2@gmail.com'
    });
    expect(response.body.email).toBe('damian2@gmail.com');
  });
  test('should update the user in the db when token is sent', async () => {
    const token = await getToken();
    await updateUserProfileRequest(token, {
      name: 'damian 2',
      email: 'damian2@gmail.com'
    });
    const user = await UserModel.findOne({ email: 'damian2@gmail.com' });
    expect(user).toBeTruthy();
  });
});
