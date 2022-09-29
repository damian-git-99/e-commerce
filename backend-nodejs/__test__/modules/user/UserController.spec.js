const request = require('supertest');
const { app } = require('../../../app');
const UserModel = require('../../../src/modules/user/UserModel');
const {
  encryptPassword
} = require('../../../src/modules/shared/utils/encrypt');
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

describe('Auth tests', () => {
  test('should return 400 when email is not sent', async () => {
    const response = await requestAuth({
      password: '1234'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return The email is not valid when email is not sent', async () => {
    const response = await requestAuth({
      password: '1234'
    });
    expect(response.body.message).toBe('The email is not valid');
  });
  test('should return 400 when email is not valid', async () => {
    const response = await requestAuth({
      password: '1234',
      email: 'damian'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return 400 when password is not sent', async () => {
    const response = await requestAuth({
      email: 'damian@gmail.com'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return The password cannot be empty when password is not sent', async () => {
    const response = await requestAuth({
      email: 'damian@gmail.com'
    });
    expect(response.body.message).toBe('The password cannot be empty');
  });
  test('should return 401 when email is valid and password is sent, but the data does not exist in the db ', async () => {
    const response = await requestAuth({
      password: '1234',
      email: 'damian@gmail.com'
    });
    expect(response.statusCode).toBe(401);
  });
  test('should return 40 when email is valid and password is incorrect', async () => {
    await UserModel.create({
      name: 'damian',
      email: 'damian@gmail.com',
      password: encryptPassword('bad-password')
    });
    const response = await requestAuth({
      password: '1234',
      email: 'damian@gmail.com'
    });
    expect(response.statusCode).toBe(401);
  });
  test('should return 200 when email is valid and password is sent, and the data exists in the db ', async () => {
    await UserModel.create({
      name: 'damian',
      email: 'damian@gmail.com',
      password: encryptPassword('1234')
    });
    const response = await requestAuth({
      password: '1234',
      email: 'damian@gmail.com'
    });
    expect(response.statusCode).toBe(200);
  });
  test('should return user information when email is valid and password is sent, and the data exists in the db ', async () => {
    await UserModel.create({
      name: 'damian',
      email: 'damian@gmail.com',
      password: encryptPassword('1234')
    });
    const response = await requestAuth({
      password: '1234',
      email: 'damian@gmail.com'
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        isAdmin: expect.any(Boolean),
        token: expect.any(String)
      })
    );
  });
});
