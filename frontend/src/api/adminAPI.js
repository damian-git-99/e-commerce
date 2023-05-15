import axios from 'axios';
import { getErrorMessage } from './productsAPI';
const URL = 'http://localhost:5000/api/users';

export async function getUsers (token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.get(URL, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function getUserDetailsAdmin (userId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.get(`${URL}/${userId}`, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function deleteUser (userId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`${URL}/${userId}`, config);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function updateUser (userId, user, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    await axios.put(`${URL}/${userId}`, user, config);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}
