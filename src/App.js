import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import styled from 'styled-components'
// Import of all pages from Index
import { About, Cart, Checkout, Error, Home, Products, SingleProduct, Private } from './pages/index'
import PrivateRoute from './pages/PrivateRoute'


function App() {
  return (
    /* Router */
    <Router>
      {/* Navbar Component */}
      <Navbar />
      {/* Sidebar Component */}
      <Sidebar />
      {/* Switch */}
      <Switch>
        {/* Home */}
        <Route exact path='/'>
          <Home />
        </Route>
        {/* About */}
        <Route exact path='/about'>
          <About />
        </Route>
        {/* Cart */}
        <Route exact path='/cart'>
          <Cart />
        </Route>
        {/* Products */}
        <Route exact path='/products'>
          <Products />
        </Route>
        {/* SingleProduct */}
        <Route exact path='/products/:id' children={<SingleProduct />} />
        {/* Checkout */}
        <PrivateRoute exact path='/checkout'>
          <Checkout />
        </PrivateRoute>
        {/* Error Page */}
        <Route path='*'>
          <Error />
        </Route>


      </Switch>
      {/* Footer Component */}
      <Footer />
    </Router>
  )
}

export default App
