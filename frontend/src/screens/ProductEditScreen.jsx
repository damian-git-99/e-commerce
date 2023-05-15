import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, Link, useRouteMatch } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { FormContainer } from '../components/FormContainer';
import axios from 'axios';
import { useUserInfo } from '../hooks/useUserInfo';
import { getProductDetails, updateProduct } from '../api/productsAPI';

export const ProductEditScreen = () => {
  const initialState = {
    name: '',
    price: 0,
    description: '',
    category: '',
    countInStock: 0,
    brand: ''
  };
  const history = useHistory();
  const { userLogin } = useUserInfo();
  const match = useRouteMatch();
  const productId = match.params.id;
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { userInfo } = userLogin;
  const { name, price, description, category, countInStock, brand } = form;

  useEffect(() => {
    setError(false);
    getProductDetails(productId)
      .then(data => {
        setForm({
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.category,
          countInStock: data.countInStock,
          brand: data.brand
        });
        console.log(data);
      });
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(`http://localhost:5000/api/products/image/upload/${productId}`, formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(productId, { ...form }, userInfo.token)
      .then(_ => {
        history.push('/admin/productlist');
      })
      .catch(error => setError(error.message));
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      {error && (
        <Alert variant='danger'>{error}</Alert>
      )}
      <FormContainer>
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              type="name"
              value={name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name='price'
              type="number"
              value={price}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>
            {uploading && <Loader />}
            <Form.Group controlId="formFileDisabled" className="mb-3">
              <Form.Label>choose image</Form.Label>
              <Form.Control type="file" id='image-file' onChange={uploadFileHandler} />
            </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              name='brand'
              type="text"
              value={brand}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              name='countInStock'
              type="number"
              value={countInStock}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name='category'
              type="text"
              value={category}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='description'
              type="text"
              value={description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary mt-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
