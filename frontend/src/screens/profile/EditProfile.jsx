import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Alert, Button, Form } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { getUserDetails } from '../../api/userAPI';

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
    getUserDetails(loggedUser.token)
      .then(data => {
        setform({
          name: data.name,
          email: data.email
        });
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
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
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && <Alert variant='success'>Profile Updated</Alert>}
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
