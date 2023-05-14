import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createProduct } from '../../actions/productActions';
import { Loader } from '../../components/Loader';
import { Message } from '../../components/Message';
import { useUserInfo } from '../../hooks/useUserInfo';
import { getProducts, deleteProduct } from '../../api/productsAPI';

export const ProductListScreen = () => {
  const history = useHistory();
  const { userLogin } = useUserInfo();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct.id}/edit`);
    } else {
      setLoading(true);
      setError(false);
      getProducts()
        .then(data => {
          setProducts(data);
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [
    history,
    userInfo,
    successCreate
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
    dispatch(createProduct());
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
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
