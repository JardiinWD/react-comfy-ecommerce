import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  // Destructuring of Product
  const { id, stock, colors } = product
  // useState method for colors (initial state colors at index 0)
  const [mainColor, setMainColor] = useState(colors[0])
  // useState method for the amount
  const [amount, setAmount] = useState(1)

  // Increase amount fn
  const increaseHandler = (e) => {
    // Preventing refresh
    e.preventDefault()
    // Change the current state of the amount
    setAmount((oldAmount) => {
      // Increase by one
      let tempAmount = oldAmount + 1
      // Check if the total amount is equal or higher than the stock
      if (tempAmount > stock) tempAmount = stock
      return tempAmount
    })
  }

  // Decrease amount fn
  const decreaseHandler = (e) => {
    // Preventing refresh
    e.preventDefault()
    // Change the current state of the amount
    setAmount((oldAmount) => {
      // Increase by one
      let tempAmount = oldAmount - 1
      // Check if the total amount is equal or less than 0
      if (tempAmount < 1) tempAmount = 1
      return tempAmount
    })
  }


  return (
    <Wrapper>
      {/* colors */}
      <div className="colors">
        <span> colors : </span>
        {/* Colors available */}
        <div>
          {
            colors.map((color, index) => {
              return (
                <button key={index} style={{ background: color }} className={`${mainColor === color ? 'color-btn active' : 'color-btn'}`} onClick={() => setMainColor(color)}>
                  {mainColor === color ? <FaCheck /> : null}
                </button>
              )
            })
          }
        </div>
      </div>
      {/* btn-container */}
      <div className="btn-container">
        {/* AmountButtons component */}
        <AmountButtons amount={amount} increase={increaseHandler} decrease={decreaseHandler} />
        {/* Link to Cart */}
        <Link to="/cart" className="btn text-center">Add to Cart</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
