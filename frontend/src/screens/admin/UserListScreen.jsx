import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { useUserInfo } from '../../hooks/useUserInfo';
import { deleteUser, getUsers } from '../../api/userAPI';

export const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;

  useEffect(() => {
    setLoading(true);
    setError(false);
    getUsers(userInfo.token)
      .then(data => {
        setUsers(data);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteUser(id, userInfo.token)
        .then(_ => {
          const newUsers = users.filter(user => user.id !== id);
          setUsers(newUsers);
        });
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin
                  ? (
                  <i className='fas fa-check' style={{ color: 'green' }}></i>
                    )
                  : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
              </td>
              <td>
                <Link to={`/admin/user/${user.id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </Link>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user.id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
