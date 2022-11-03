import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

// Handler for local storage Item
const getLocalStorage = () => {
  // I saved in a variable what I GET
  let cart = localStorage.getItem('cart')
  // if cart it's true
  if (cart) {
    // I take the result and put the result in the initial state
    return JSON.parse(localStorage.getItem('cart'))
  }
  else {
    // I returned an empty array, just for the initial State
    return []
  }
}

// My initial State
const initialState = {
  cart: getLocalStorage(), // It depends on what there is on the local storage
  total_items: 0, // 0 items
  total_amount: 0, // setting 0 as initial total amount
  shipping_fee: 534, // 5.34$ as initial expedition
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  // useReducer method
  const [state, dispatch] = useReducer(reducer, initialState)

  //#region Handler fn (Add, remove, toggle, clear)

  // AddToCart handler Arrow Function
  const addToCart = (id, color, amount, product) => {
    // Dispatch fn
    dispatch(
      {
        type: ADD_TO_CART, // Action set as ADD_TO_cART
        payload: { id, color, amount, product } // Payload that I passed to the reducer
      }
    )
  }

  // removeToCart handler Arrow Function
  const removeToCart = (id) => {
    // Dispatch fn for the REMOVE CART ITEM action
    dispatch(
      {
        type: REMOVE_CART_ITEM, // Action
        payload: id // Passed the id
      }
    )
  }

  // toggleAmount handler Arrow Function
  const toggleAmount = (id, value) => {
    dispatch(
      {
        type: TOGGLE_CART_ITEM_AMOUNT, // Action
        payload: { id, value } // The value that reducer is going to check
      }
    )
  }

  // clearCart handler arrow fn
  const clearCart = () => {
    // Dispatch fn
    dispatch({ type: CLEAR_CART })
  }

  //#endregion

  //#region Local storage
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  //#endregion

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeToCart, toggleAmount, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
