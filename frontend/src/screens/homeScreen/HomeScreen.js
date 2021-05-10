import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from "../../components/product/Product"
import { listProducts } from '../../redux/actions/productAction'
import Loader from "../../components/loader/Loader"
import Message from "../../components/message/Message"
import Paginate from "../../components/paginate/Paginate"

const HomeScreen = ({history}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages } = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])


    return (
        <div>
            <h1>Latest Products</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4}
                                     xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate
                            page={page}
                            pages={pages}
                            keyword={keyword}
                        />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
