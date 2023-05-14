import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { useHistory } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import axios from 'axios';

export const ProfileScreen = () => {
  return (
    <Row>
      <Col md={4}>
        <EditProfile />
      </Col>
      <Col md={8} className="mt-5 mt-md-0">
        <MyOrders />
      </Col>
    </Row>
  );
};

export const EditProfile = () => {
  const initialState = {
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  };
  const [form, setform] = useState(initialState);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [success] = useState(undefined); // todo: show success message when profile updated
  const [message, setMessage] = useState(null);
  const { userLogin, updateUserProfile } = useUserInfo();
  const { userInfo: loggedUser } = userLogin;
  const { email, password, name, confirmPassword } = form;

  useEffect(() => {
    async function getUserDetails () {
      try {
        setError(undefined);
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedUser.token}`
          }
        };
        const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
        const { email, name } = data;
        setform({
          name,
          email
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getUserDetails();
  }, []);

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      updateUserProfile({ name, email, password });
    }
  };

  return (
    <>
      <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={handleChange}
              name="name"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={handleChange}
              name="email"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={handleChange}
              name="password"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3 w-100'>
            Update
          </Button>
        </Form>
    </>
  );
};

export const MyOrders = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { userLogin } = useUserInfo();
  const { userInfo: loggedUser } = userLogin;

  if (!loggedUser) {
    history.push('/login');
  }

  useEffect(() => {
    async function getUserOrders () {
      setError(undefined);
      setLoading(true);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedUser.token}`
          }
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getUserOrders();
  }, []);

  return (
    <>
       <h2>My Orders</h2>
        {loading
          ? (
          <Loader />
            )
          : error
            ? (
          <Message variant='danger'>{error}</Message>
              )
            : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid
                      ? (
                          order.paidAt.substring(0, 10)
                        )
                      : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                  </td>
                  <td>
                    {order.isDelivered
                      ? (
                          order.deliveredAt.substring(0, 10)
                        )
                      : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
              )}

    </>
  );
};
