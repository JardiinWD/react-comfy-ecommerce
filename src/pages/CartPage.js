import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
  // Destructuring of useCartContext
  const { cart } = useCartContext()
  // CHeck if there aren't item in the cart
  if (cart.length < 1) {
    return (
      /* page-100 */
      <Wrapper className="page-100">
        {/* empty */}
        <div className="empty">
          {/* Title */}
          <h2>Your cart is empty</h2>
          {/* btn */}
          <Link to="/products" className='btn'>
            Fill it
          </Link>
        </div>
      </Wrapper>
    )
  }
  // Otherwise
  else {
    return (
      <main>
        {/* Pagehero component */}
        <PageHero title="cart" />
        {/* page */}
        <Wrapper className="page">
          {/* Cart Content component */}
          <CartContent />
        </Wrapper>
      </main>
    )
  }
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
