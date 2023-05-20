/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Link, useParams } from 'react-router-dom';
import { addProductReview } from '../../api/productsAPI';
import { Alert, Button, Form, ListGroup } from 'react-bootstrap';
import { Rating } from '../../components/Rating';

export const Reviews = ({ product, setAddReview }) => {
  const match = useParams();
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(undefined);

  const submitHandler = (e) => {
    e.preventDefault();
    addProductReview(match.id, { rating, comment }, userInfo.token)
      .then((_) => {
        setAddReview(true);
        setRating(0);
        setComment('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <h2>Reviews</h2>
      {product && product.reviews && product.reviews.length === 0 && (
        <Alert>No Reviews</Alert>
      )}
      <ListGroup variant="flush">
        {product &&
          product.reviews &&
          product.reviews.map((review) => (
            <ListGroup.Item key={review.id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        <ListGroup.Item>
          <h2>Write a Customer Review</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* todo: move to another component */}
          {userInfo
            ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  row="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Submit
              </Button>
            </Form>
              )
            : (
            <Alert>
              Please <Link to="/login">sign in</Link> to write a review{' '}
            </Alert>
              )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
