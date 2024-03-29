import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';
import PropTypes from 'prop-types';

export const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" data-masonry='{"percentPosition": true }'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.image} variant="top" className='product-img'/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};
