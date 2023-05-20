import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { FormContainer } from '../../components/FormContainer';
import { useUserInfo } from '../../hooks/useUserInfo';

export const RegisterScreen = () => {
  const { userLogin, register } = useUserInfo();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const initialState = {
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  };
  const [form, setform] = useState(initialState);
  const { email, password, name, confirmPassword } = form;
  const { loading, error, userInfo: loggedUser } = userLogin;

  useEffect(() => {
    if (loggedUser) {
      navigate('/');
    }
  }, [navigate, loggedUser]);

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
      register(name, email, password);
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
          <Form.Label>Password</Form.Label>
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

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={'/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
