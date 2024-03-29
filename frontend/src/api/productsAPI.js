import axios from 'axios';
const URL = 'http://localhost:5000/api/products';

export async function getProductDetails (id) {
  try {
    const { data } = await axios.get(`${URL}/${id}`);
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

export async function updateProduct (productId, product, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${URL}/${productId}`,
      product,
      config
    );

    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function updateProductImage (productId, formData, token) {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(`${URL}/image/upload/${productId}`, formData, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export async function createProduct (token) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.post(URL, {}, config);
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
}

export function getErrorMessage (error) {
  const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
  return message;
}
