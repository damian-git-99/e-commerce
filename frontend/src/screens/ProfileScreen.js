import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { listMyOrders } from '../actions/orderActions';
import { useHistory } from 'react-router-dom';

export const ProfileScreen = () => {
  const initialState = {
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [form, setform] = useState(initialState);
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { email, password, name, confirmPassword } = form;
  const { loading, error, user } = userDetails;
  const { userInfo: loggedUser } = userLogin;

  const { success } = userUpdateProfile;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!loggedUser) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
        dispatch(listMyOrders());
      } else {
        setform({
          ...form,
          name: user.name,
          email: user.email
        });
      }
    }
  }, [dispatch, history, loggedUser, user]);

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
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={4}>
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
      </Col>
      <Col md={8} className="mt-5 mt-md-0">
        <h2>My Orders</h2>
        {loadingOrders
          ? (
          <Loader />
            )
          : errorOrders
            ? (
          <Message variant='danger'>{errorOrders}</Message>
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
      </Col>
    </Row>
  );
};
