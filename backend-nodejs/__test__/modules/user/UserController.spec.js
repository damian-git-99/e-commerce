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
  test('should return 400 when email is valid and password is incorrect', async () => {
    await createUserInDB({
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
    await createUserInDB();
    const response = await requestAuth({
      password: '1234',
      email: 'damian@gmail.com'
    });
    expect(response.statusCode).toBe(200);
  });
  test('should return user information when email is valid and password is sent, and the data exists in the db ', async () => {
    await createUserInDB();
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

describe('Sign up tests', () => {
  test('should return 400 when email is not sent', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      password: '123456',
      name: 'damian'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return The email is not valid when email is not sent', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      password: '123456',
      name: 'damian'
    });
    expect(response.body.message).toBe('The email is not valid');
  });
  test('should return 400 when email is not valid', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      password: '1234',
      email: 'damian',
      name: 'myName'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return 400 when password is not sent', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return The password cannot be emptyd when password is not sent', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian'
    });
    expect(response.body.message).toBe('The password cannot be empty');
  });
  test('should return 400 when the email already exists', async () => {
    await createUserInDB();
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian',
      password: '123456'
    });
    expect(response.statusCode).toBe(400);
  });
  test('should return Email is already taken when the email already exists', async () => {
    await createUserInDB();
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian',
      password: '123456'
    });
    expect(response.body.message).toBe('Email is already taken');
  });
  test('should return 201 when all the information sent is valid', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian',
      password: '123456'
    });
    expect(response.statusCode).toBe(201);
  });
  test('should hash the password', async () => {
    await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian',
      password: '123456'
    });
    const user = await UserModel.findOne({ email: 'damian@gmail.com' });
    expect(user.password).not.toBe('123456');
  });
  test('should return the user info when all the information sent is valid', async () => {
    const response = await request(app).post(`${url}/signup`).send({
      email: 'damian@gmail.com',
      name: 'damian',
      password: '123456'
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

describe('Get Profile Tests', () => {
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).get(`${url}/profile`).send();
    expect(response.statusCode).toBe(401);
  });
  test('should return 200 when token is sent', async () => {
    const token = await getToken();
    const response = await request(app)
      .get(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('should return user info when token is sent', async () => {
    const token = await getToken();
    const response = await request(app)
      .get(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send();
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
  test('should return 401 when token is not sent', async () => {
    const response = await request(app).put(`${url}/profile`).send();
    expect(response.statusCode).toBe(401);
  });
  test('should update the user name when token is sent', async () => {
    const token = await getToken();
    const response = await request(app)
      .put(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'damian 2',
        email: 'damian2@gmail.com'
      });
    expect(response.body.name).toBe('damian 2');
  });
  test('should update the user email when token is sent', async () => {
    const token = await getToken();
    const response = await request(app)
      .put(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'damian 2',
        email: 'damian2@gmail.com'
      });
    expect(response.body.email).toBe('damian2@gmail.com');
  });
  test('should update the user in the db when token is sent', async () => {
    const token = await getToken();
    await request(app)
      .put(`${url}/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'damian 2',
        email: 'damian2@gmail.com'
      });
    const user = await UserModel.findOne({ email: 'damian2@gmail.com' });
    expect(user).toBeTruthy();
  });
});

// Admin Tests
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
