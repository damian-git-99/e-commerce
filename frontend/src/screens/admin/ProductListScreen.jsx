import React, { useEffect, useState } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { useUserInfo } from '../../hooks/useUserInfo';
import { getProducts, deleteProduct, createProduct } from '../../api/productsAPI';

export const ProductListScreen = () => {
  const history = useHistory();
  const { userLogin } = useUserInfo();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userInfo } = userLogin;

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [
    history,
    userInfo
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      setError(false);
      deleteProduct(id, userInfo.token)
        .then(_ => {
          const newProducts = products.filter(product => product.id !== id);
          setProducts(newProducts);
        })
        .catch(error => setError(error.message));
    }
  };

  const createProductHandler = () => {
    setError(false);
    createProduct(userInfo.token)
      .then(createdProduct => {
        history.push(`/admin/product/${createdProduct.id}/edit`);
      })
      .catch(error => setError(error.message));
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading
        ? (
        <Loader />
          )
        : error
          ? (
        <Message variant='danger'>{error}</Message>
            )
          : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product.id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product.id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
            )}
    </>
  );
};
