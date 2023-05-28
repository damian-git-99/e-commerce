import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../hooks/useUserInfo';
import { getUserOrders } from '../../api/orderAPI';
import { Loader } from '../../components/Loader';
import { Alert, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { userLogin } = useUserInfo();
  const { userInfo: loggedUser } = userLogin;

  useEffect(() => {
    setError(undefined);
    setLoading(true);
    getUserOrders(loggedUser.token)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
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
        <Alert variant="danger">{error}</Alert>
            )
          : (
        <Table striped bordered hover responsive className="table-sm">
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
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
            )}
    </>
  );
};
