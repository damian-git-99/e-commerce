import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Product } from '../components/Product';

export const HomeScreen = () => {
  const match = useRouteMatch();
  const keyword = match.params.keyword || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function listProducts (keyword) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products?keyword=${keyword}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    listProducts(keyword);
  }, [keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading
        ? (
        <Loader />
          )
        : error
          ? (
        <Message variant='danger' > {error} </Message>
            )
          : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>)}
    </>
  );
};
