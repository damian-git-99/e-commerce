import axios from 'axios';
const URL = 'http://localhost:5000/api/products';

export async function getProductDetails (id) {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function addProductReview (productId, review, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    await axios.post(`${URL}/${productId}/reviews`, review, config);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function getProducts (keyword = '') {
  try {
    const { data } = await axios.get(`${URL}?keyword=${keyword}`);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function deleteProduct (productId, token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.delete(`${URL}/${productId}`, config);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

function getErrorMessage (error) {
  const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  return message;
}
