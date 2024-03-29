import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FormContainer } from '../../components/FormContainer';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { useUserInfo } from '../../hooks/useUserInfo';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { userLogin, login } = useUserInfo();
  const initialState = {
    email: '',
    password: ''
  };
  const [form, setform] = useState(initialState);
  const { email, password } = form;
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
    login(email, password);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            name="email"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            name="password"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className='mt-3'>
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={'/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
