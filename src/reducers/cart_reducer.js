import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  /* ADD_TO_CART */
  if (action.type === ADD_TO_CART) {
    /* Destructuring of payload */
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => {
      return i.id === id + color
    })

    // Statement for the Temp Item
    if (tempItem) {
      // Create a variable for the Temporary Cart
      const tempCart = state.cart.map((cartItem) => {
        // Check if the id exists so you can change the amount
        if (cartItem.id === id + color) {
          // Create the new amount variable
          let newAmount = cartItem.amount + amount
          // Statement and check for the new Amount
          if (newAmount > cartItem.max) newAmount = cartItem.max
          // Returning values
          return { ...cartItem, amount: newAmount }
        }
        /* Returning the cartItem */
        else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    }
    // Statement for the Temp Item
    else {
      // Create an Object with this value
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      // Returning
      return {
        ...state, // Spreading state
        // Cart array with
        cart: [
          ...state.cart, // State.cart
          newItem // The object 
        ]
      }
    }
  }

  /* REMOVE_CART_ITEM */
  if (action.type === REMOVE_CART_ITEM) {
    // Created a new variable (temp cart) and filtered the item id
    // Action.payload === payload: id
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    // Return the new current state
    return { ...state, cart: tempCart }
  }

  /* CLEAR_CART */
  if (action.type === CLEAR_CART) {
    // Reset the current state
    return { ...state, cart: [] }
  }

  /* TOGGLE_CART_ITEM_AMOUNT*/
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    // Destructuring of payload
    const { id, value } = action.payload
    // Create a new variable for mapping state.cart
    const tempCart = state.cart.map((item) => {
      // Checked if item.id is Equal to ID
      if (item.id === id) {
        // If user clicks on the increment button
        if (value === 'inc') {
          // create a new variable for the new amount
          let newAmount = item.amount + 1
          // Check if the new amount is greater than the max number of items
          if (newAmount > item.max) newAmount = item.max
          // Update the current state of item with the new amount
          return {
            ...item,
            amount: newAmount
          }
        }
        // If user clicks on the decrement button
        if (value === 'dec') {
          // create a new variable for the new amount
          let newAmount = item.amount - 1
          // Check if the new amount is lower than 1
          if (newAmount < 1) newAmount = 1
          // Update the current state of item with the new amount         
          return {
            ...item,
            amount: newAmount
          }
        }
      }
      // Otherwise I just return the item itself
      else {
        return item
      }
    })
    // Update the current state and the cart itself
    return {
      ...state,
      cart: tempCart
    }
  }

  /* COUNT_CART_TOTALS */
  if (action.type === COUNT_CART_TOTALS) {
    // Destructuring of state.cart and created a filter
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      // Destructuring of cartItem
      const { amount, price } = cartItem
      console.log(amount); // Verify in console
      console.log(price); // Verify in console
      // Update the items
      total.total_items += amount
      // Update the amount
      total.total_amount += price * amount
      // Returned total param
      return total
    }, {
      total_items: 0, // initial state
      total_amount: 0 // initial state
    })
    // Returned the new current state
    return {
      ...state,
      total_items,
      total_amount
    }
  }

  return state
  /* throw new Error(`No Matching "${action.type}" - action type`) */
}

export default cart_reducer
