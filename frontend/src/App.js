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
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
