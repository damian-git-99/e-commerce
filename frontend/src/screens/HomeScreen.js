import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import { Product } from '../components/Product'

export const HomeScreen = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products');
            setproducts(data);
        }
        fetchProducts();
    }, []);


    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
