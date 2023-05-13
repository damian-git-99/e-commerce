import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { Product } from '../components/Product';

export const HomeScreen = () => {
  const match = useRouteMatch();
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

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
