/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { getProductDetails, updateProductImage } from '../api/productsAPI';

export const ProductImageEditScreen = () => {
  const { id: productId } = useParams();
  const { userLogin } = useUserInfo();
  const { userInfo } = userLogin;
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setError(undefined);
    getProductDetails(productId)
      .then(data => {
        setCurrentImage(data.image);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(undefined);
    if (!file) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.set('image', file[0]);
    updateProductImage(productId, formData, userInfo.token)
      .then(image => {
        setUploading(false);
        setCurrentImage(image);
      })
      .catch(error => {
        console.log(error);
        setUploading(false);
        setError(error.message);
      });
  };

  return (
    <Row className='justify-content-center'>
     { uploading && <Alert variant='success'>Uploading...</Alert> }
     { error && <Alert variant='danger'>{error}</Alert> }
      <Col md={6} >
      <h1>Edit Image</h1>
      { currentImage === '' && <Alert variant='info'>Product has no image</Alert> }
      { currentImage !== '' && (
        <>
          <img src={currentImage} className='w-100 d-block' />
          <p>Current image</p>
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFileDisabled" className="mb-3">
          <Form.Label>choose image</Form.Label>
          <Form.Control type="file" id='image-file' onChange={(e) => setFile(e.target.files)} />
        </Form.Group>
        <Button type='submit' disabled={uploading} >Update Image</Button>
      </Form>
      </Col>
    </Row>
  );
};
