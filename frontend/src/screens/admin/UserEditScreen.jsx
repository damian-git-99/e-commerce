/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { FormContainer } from '../../components/FormContainer';
import { getUserDetailsAdmin, updateUser } from '../../api/adminAPI';
import { useUserInfo } from '../../hooks/useUserInfo';

export const UserEditScreen = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();
  const userId = match.params.id;
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user.name || user.id != userId) {
      setError(false);
      setLoading(true);
      getUserDetailsAdmin(userId, userInfo.token)
        .then(data => {
          setUser(data);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    updateUser(userId, { name, email, isAdmin }, userInfo.token)
      .then(_ => {
        history.push('/admin/userlist');
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
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='mt-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='mt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
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
