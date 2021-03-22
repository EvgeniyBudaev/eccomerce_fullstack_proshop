import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

import Rating from "../../components/rating/Rating"
import { listProductDetails } from '../../redux/actions/productAction'
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";


const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {error, loading, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])


  return (
      <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {
          loading ? <Loader />
              : error
              ? <Message variant='danger'>{error}</Message>
              : (
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
                          <Rating value={product.rating} text={`${product.numReviews} ratings`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                          Price: ${product.price}
                        </ListGroup.Item>

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
                                {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                              </Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item>
                            <Button className='btn-block' disabled={product.countInStock == 0} type='button'>Add to Cart</Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  </Row>
              )
        }
      </div>
  )
}

export default ProductScreen
