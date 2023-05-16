import axios from 'axios';
import { getErrorMessage } from './productsAPI';
const URL = 'http://localhost:5000/api/orders';

export async function createOrder (order, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(URL, order, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function getOrderDetails (id, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.get(`${URL}/${id}`, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function payOrder (orderId, paymentResult, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${URL}/${orderId}/pay`,
      paymentResult,
      config
    );
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function deliverOrder (order, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${URL}/${order.id}/deliver`,
      {},
      config
    );
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function getOrders (token) {
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
