const request = require('supertest');
const { app } = require('../../../app');
const {
  encryptPassword
} = require('../../../src/utils/encrypt');
const UserModel = require('../../../src/modules/user/UserModel');
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

const validUser = {
  name: 'damian',
  email: 'damian@gmail.com',
  password: encryptPassword('1234')
};

const requestAuth = (userData) => {
  return request(app).post(`${url}/login`).send(userData);
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

describe('Get Users tests', () => {
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).get(`${url}/`)
      .send();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await request(app).get(`${url}/`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(403);
  });
  test('should return 200 when user is admin', async () => {
    const token = await getToken(true);
    const response = await request(app).get(`${url}/`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('should return an array when user is admin', async () => {
    const token = await getToken(true);
    const response = await request(app).get(`${url}/`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Get User By id tests', () => {
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).get(`${url}/41224d776a326fb40f000001`)
      .send();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await request(app).get(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await request(app).get(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await request(app).get(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('should return user info when user exist', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await request(app).get(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        isAdmin: expect.any(Boolean)
      })
    );
  });
});

describe('Delete user tests', () => {
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).delete(`${url}/41224d776a326fb40f000001`)
      .send();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await request(app).delete(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await request(app).delete(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist and was deleted', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await request(app).delete(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('should delete the user in the database', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    await request(app).delete(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    const deletedUser = await UserModel.findOne({ email: validUser.email });
    expect(deletedUser).toBeFalsy();
  });
});

describe('Update User Tests', () => {
  const newUser = {
    name: 'user updated',
    email: 'userUpdated@gmail.com'
  };
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).put(`${url}/41224d776a326fb40f000001`)
      .send(newUser);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await request(app).put(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await request(app).delete(`${url}/41224d776a326fb40f000001`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist and was updated', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await request(app).put(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
    expect(response.statusCode).toBe(200);
  });
  test('should update the user in the database', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    await request(app).put(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
    const updatedUser = await UserModel.findById(user.id);
    expect(updatedUser.name).toBe(newUser.name);
    expect(updatedUser.email).toBe(newUser.email);
  });
  test('should return user info when user exist and was updated', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await request(app).put(`${url}/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
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
