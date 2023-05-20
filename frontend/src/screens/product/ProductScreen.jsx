/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Alert } from 'react-bootstrap';
import { Loader } from '../../components/Loader';
import { Rating } from '../../components/Rating';
import { Reviews } from './Reviews';
import { getProductDetails } from '../../api/productsAPI';

export const ProductScreen = () => {
  const navigate = useNavigate();
  const match = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [addSuccessReview, setAddSuccessReview] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    getProductDetails(match.id)
      .then((data) => {
        setProduct(data);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [match, addSuccessReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${match.id}?qty=${quantity}`);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading
        ? (
        <Loader />
          )
        : error
          ? (
        <Alert variant='danger'>{error}</Alert>
            )
          : (
        <>
          { product && (
            <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          )}
          <Row>
            <Col md={6}>
                <Reviews product={product} setAddReview={setAddSuccessReview} />
            </Col>
          </Row>
        </>
            )}
    </>
  );
};
