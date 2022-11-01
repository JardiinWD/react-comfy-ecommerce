import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false, // Initial state of isSidebarOpen as a boolean value
  products_loading: false, // Initial state of products_loading as a boolean value
  products_error: false, // Initial state of products_error as a boolean value
  products: [], // Initial state of products as an empty array
  featured_products: [] // Initial state of featured_products as an empty array
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // useReducer method
  const [state, dispatch] = useReducer(reducer, initialState)

  // Open sidebar Handler
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  // Close sidebar Handler
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // Fetching products fn
  const fetchProducts = async (url) => {
    // I invoke useReducer dispatch fn with the action.type "GET_PRODUCTS_BEGIN"
    dispatch({ type: GET_PRODUCTS_BEGIN })
    // I invoke try/catch js fn for the response of my API
    try {
      // I save axios' await response in a variable
      const response = await axios.get(url)
      // I saved my response.data in another variable
      const products = response.data
      console.log(products); // Look the response in console
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    }
    catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  useEffect(() => {
    // I invoke fetchProducts fn in useEffect hook
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
