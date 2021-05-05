import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HomeScreen from "./screens/homeScreen/HomeScreen"
import ProductScreen from "./screens/productScreen/ProductScreen"
import CartScreen from "./screens/cartScreen/CartScreen"
import LoginScreen from "./screens/loginScreen/LoginScreen"
import RegisterScreen from "./screens/registerScreen/RegisterScreen"
import ProfileScreen from "./screens/profileScreen/ProfileScreen"
import ShippingScreen from "./screens/shippingScreen/ShippingScreen"
import PaymentScreen from "./screens/paymentScreen/PaymentScreen"
import PlaceOrderScreen from "./screens/placeOrderScreen/PlaceOrderScreen"
import OrderScreen from "./screens/orderScreen/orderScreen"
import UserListScreen from "./screens/userListScreen/UserListScreen"
import UserEditScreen from "./screens/userEditScreen/UserEditScreen"
import ProductListScreen from "./screens/productListScreen/ProductListScreen"
import ProductEditScreen from "./screens/productEditScreen/ProductEditScreen"
import OrderListScreen from "./screens/orderListScreen/OrderListScreen"

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login/" component={LoginScreen} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/shipping/" component={ShippingScreen} />
          <Route path="/placeorder/" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/payment/" component={PaymentScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
