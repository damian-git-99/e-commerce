import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
