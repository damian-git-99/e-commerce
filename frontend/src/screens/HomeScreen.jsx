import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Product } from '../components/Product';
import { getProducts } from '../api/productsAPI';

export const HomeScreen = () => {
  const match = useRouteMatch();
  const keyword = match.params.keyword || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProducts(keyword)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
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
