const request = require('supertest');
const { app } = require('../../../src/app');
const {
  encryptPassword
} = require('../../../src/utils/encrypt');
const UserModel = require('../../../src/user/UserModel');
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
  const getUsersRequest = (token) => {
    return request(app).get(`${url}/`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await getUsersRequest();
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await getUsersRequest(token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 200 when user is admin', async () => {
    const token = await getToken(true);
    const response = await getUsersRequest(token);
    expect(response.statusCode).toBe(200);
  });
  test('should return an array when user is admin', async () => {
    const token = await getToken(true);
    const response = await getUsersRequest(token);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Get User By id tests', () => {
  const id = '41224d776a326fb40f000001';
  const getUserByIdRequest = (id, token) => {
    return request(app).get(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await getUserByIdRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await getUserByIdRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await getUserByIdRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await getUserByIdRequest(user.id, token);
    expect(response.statusCode).toBe(200);
  });
  test('should return user info when user exist', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await getUserByIdRequest(user.id, token);
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
  const id = '41224d776a326fb40f000001';
  const deleteUserByIdRequest = (id, token) => {
    return request(app).delete(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
  };
  test('should return 401 when token is not sent', async () => {
    const response = await deleteUserByIdRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await deleteUserByIdRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await deleteUserByIdRequest(id, token);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist and was deleted', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await deleteUserByIdRequest(user.id, token);
    expect(response.statusCode).toBe(200);
  });
  test('should delete the user in the database', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    await deleteUserByIdRequest(user.id, token);
    const deletedUser = await UserModel.findOne({ email: validUser.email });
    expect(deletedUser).toBeFalsy();
  });
});

describe('Update User Tests', () => {
  const id = '41224d776a326fb40f000001';
  const newUser = {
    name: 'user updated',
    email: 'userUpdated@gmail.com'
  };
  const updateUserRequest = (id, token, user) => {
    return request(app).put(`${url}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(user);
  };
  test('should return 401 when token is not sent', async () => {
    const response = await updateUserRequest(id);
    expect(response.statusCode).toBe(401);
  });
  test('should return 403 when user is not admin', async () => {
    const token = await getToken();
    const response = await updateUserRequest(id, token);
    expect(response.statusCode).toBe(403);
  });
  test('should return 404 when user does not exist', async () => {
    const token = await getToken(true);
    const response = await updateUserRequest(id, token, newUser);
    expect(response.statusCode).toBe(404);
  });
  test('should return 200 when user exist and was updated', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await updateUserRequest(user.id, token, newUser);
    expect(response.statusCode).toBe(200);
  });
  test('should update the user in the database', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    await updateUserRequest(user.id, token, newUser);
    const updatedUser = await UserModel.findById(user.id);
    expect(updatedUser.name).toBe(newUser.name);
    expect(updatedUser.email).toBe(newUser.email);
  });
  test('should return user info when user exist and was updated', async () => {
    const token = await getToken(true);
    const user = await UserModel.findOne({ email: validUser.email });
    const response = await updateUserRequest(user.id, token, newUser);
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
