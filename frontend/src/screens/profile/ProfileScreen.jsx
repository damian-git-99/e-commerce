import React from 'react';
import { EditProfile } from './EditProfile';
import { MyOrders } from './MyOrders';
import { Col, Row } from 'react-bootstrap';

export const ProfileScreen = () => {
  return (
    <Row>
      <Col md={4}>
        <EditProfile />
      </Col>
      <Col md={8} className="mt-5 mt-md-0">
        <MyOrders />
      </Col>
    </Row>
  );
};
