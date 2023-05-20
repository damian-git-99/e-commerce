import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { useUserInfo } from '../hooks/useUserInfo';
import { getOrders } from '../api/orderAPI';

export const OrderListScreen = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      setError(false);
      setLoading(true);
      getOrders(userInfo.token)
        .then(data => {
          setOrders(data);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
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
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid
                  ? (
                      order.paidAt.substring(0, 10)
                    )
                  : (
                  <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
              </td>
              <td>
                {order.isDelivered
                  ? (
                      order.deliveredAt.substring(0, 10)
                    )
                  : (
                  <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
              </td>
              <td>
                <Link to={`/order/${order.id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
