/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { FormContainer } from '../../components/FormContainer';
import { getUserDetailsAdmin, updateUser } from '../../api/userAPI';
import { useUserInfo } from '../../hooks/useUserInfo';

export const UserEditScreen = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  const { name, email, isAdmin } = user;

  useEffect(() => {
    setError(false);
    setLoading(true);
    getUserDetailsAdmin(userId, userInfo.token)
      .then(data => {
        setUser(data);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    updateUser(userId, { name, email, isAdmin }, userInfo.token)
      .then(_ => {
        navigate('/admin/userlist');
        // todo update global state if authenticated user is modified
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                name='name'
                placeholder='Enter name'
                value={name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='mt-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                placeholder='Enter email'
                value={email}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='mt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                name='isAdmin'
                checked={isAdmin}
                onChange={() => setUser({ ...user, isAdmin: !isAdmin })}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </Form>
      </FormContainer>
    </>
  );
};
