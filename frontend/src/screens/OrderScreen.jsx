/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Image, Card, Button, Alert } from 'react-bootstrap';
import { useRouteMatch, Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import { useUserInfo } from '../hooks/useUserInfo';
import { deliverOrder, getOrderDetails, payOrder } from '../api/orderAPI';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const OrderScreen = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
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
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      const { data: clientId } = await axios.get('http://localhost:5000/api/config/paypal', config);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    getOrderDetails(orderId, userInfo.token)
      .then(data => {
        setOrder(data);
      });

    if (!order?.isPaid) {
      if (!window.paypal) addPayPalScript();
      else setSdkReady(true);
    }
  }, [orderId]);

  const successPaymentHandler = (paymentResult) => {
    const data = {
      id: paymentResult.id,
      status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.payer.email_address
    };
    setLoading(true);
    setError(false);
    payOrder(orderId, data, userInfo.token)
      .then(data => {
        setOrder({
          ...order,
          isPaid: true
        });
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
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
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
                  )
                : (
                <Message variant="danger">Not Delivered</Message>
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
                <Message variant="success">Paid on {order.paidAt}</Message>
                  )
                : (
                <Message variant="danger">Not Paid</Message>
                  )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0
                ? (
                <Message>Order is empty</Message>
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
                  {loading && <Loader />}
                  {!sdkReady
                    ? (
                    <Loader />
                      )
                    : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                      )}
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
