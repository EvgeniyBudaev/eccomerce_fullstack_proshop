import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import FormContainer from "../../containers/form/FormContainer"
import Message from "../../components/message/Message"
import Loader from "../../components/loader/Loader"
import {listProductDetails} from "../../redux/actions/productAction"

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    useEffect(() => {
        if (!product.name ?? product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setCategory(product.category)
            setDescription(product.description)
        }

    }, [dispatch, product, productId, history])

    const submitHandler = (e) => {
        e.preventDefault()
        // Update product
    }


    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit product</h1>

                {loading ? <Loader/> : error ?
                    <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Price'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Image'
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='brand'
                                    placeholder='Enter Brand'
                                    value={name}
                                    onChange={e => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Stock'
                                    value={countInStock}
                                    onChange={e => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit'
                                    variant='primary'>Update</Button>

                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen