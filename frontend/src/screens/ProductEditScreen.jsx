import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, Link, useRouteMatch } from 'react-router-dom';
import { FormContainer } from '../components/FormContainer';
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
  const [error, setError] = useState(false);
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
      });
  }, [productId]);

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
      <Link to="/admin/productlist" className="btn btn-success my-3 mx-3">
        Go Back
      </Link>
      <Link className='btn btn-dark' to={`/admin/product/${productId}/image/edit`}>Edit Image</Link>
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
