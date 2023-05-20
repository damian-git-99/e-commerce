/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from '../../api/orderAPI';
import { Loader } from '../../components/Loader';
import { useUserInfo } from '../../hooks/useUserInfo';
import { PayPalButton } from './PayPalButton';

export const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState();
  const [error, setError] = useState(false);
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;

  if (order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  }

  useEffect(() => {
    getOrderDetails(orderId, userInfo.token)
      .then(data => {
        setOrder(data);
      });
  }, [orderId]);

  const successPaymentHandler = (paymentResult) => {
    const data = {
      id: paymentResult.id,
      status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.payer.email_address
    };
    setError(false);
    payOrder(orderId, data, userInfo.token)
      .then(data => {
        console.log(data);
        setOrder({
          ...order,
          isPaid: true,
          paidAt: data.paidAt
        });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <>
      <h1>Order {order?.id}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {order && (
        <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mail to:${order?.user?.email}`}>{order?.user?.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered
                ? (
                <Alert variant="success">
                  Delivered on {order.deliveredAt}
                </Alert>
                  )
                : (
                <Alert variant="danger">Not Delivered</Alert>
                  )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid
                ? (
                <Alert variant="success">Paid on {order.paidAt}</Alert>
                  )
                : (
                <Alert variant="danger">Not Paid</Alert>
                  )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0
                ? (
                <Alert>Order is empty</Alert>
                  )
                : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                  )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={(paymentResult) => successPaymentHandler(paymentResult)}
                    />
                </ListGroup.Item>
              )}
              <DeliverOrder order={order} userInfo={userInfo} setOrder={setOrder} />
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
    </>
  );
};

export const DeliverOrder = ({ order, userInfo, setOrder }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const deliverHandler = () => {
    setError(false);
    setLoading(true);
    deliverOrder(order, userInfo.token)
      .then((data) => {
        setOrder({ ...order, isDelivered: true, deliveredAt: data.deliveredAt });
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
        <ListGroup.Item>
          <Button
            type='button'
            className='btn btn-block'
            onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
        </ListGroup.Item>
      )}
    </div>
  );
};
