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
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import ShippingScreen from "./screens/shippingScreen/ShippingScreen";
import PaymentScreen from "./screens/paymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen/PlaceOrderScreen";


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
          <Route path="/payment/" component={PaymentScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
