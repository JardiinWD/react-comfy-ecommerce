import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [], // Initial state of filtered_products as an empty array
  all_products: [], // Initial state of all_products as an empty array
  grid_view: false, // Initial state of grid_view as a boolean value
  sort: 'price-lowest', // Initial state of sort as a string (Option value)
  // Filters object with his initial Value
  filters: {
    text: '',  // Initial state of text as an empty string
    company: 'all', // Initial state of company as all
    category: 'all', // Initial state of category as all
    color: 'all', // Initial state of color as all
    min_price: 0,  // Initial state of min_price as 0
    max_price: 0, // Initial state of max_price as 0
    price: 0, // Initial state of price as 0
    shipping: false // Initial state of shipping as a boolean value
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  //#region useReducer

  // Destructuring of context
  const { products } = useProductsContext()
  // useReducer method
  const [state, dispatch] = useReducer(reducer, initialState)

  //#endregion 

  //#region useEffect

  // useEffect for loading products
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  // useEffect for sorting products
  useEffect(() => {
    // Invoke the Dispatch Fn for filter products
    dispatch({ type: FILTER_PRODUCTS })
    // Invoke the Dispatch Fn for sorting products
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  //#endregion 

  //#region Grid / List

  // Callback fn for sorting the products as a grid
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  // Callback fn for sorting the products as a list
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  //#endregion

  //#region Sorting

  // Callback fn for sorting the products 
  const updateSort = (e) => {
    // Save the target.name in a variable
    // const name = e.target.name
    // console.log(name); // Verify in console

    // Save the target.value in a variable
    const value = e.target.value
    console.log(value); // Verify in console
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  //#endregion 

  //#region Filters

  // updateFilters fn
  const updateFilters = (event) => {
    // Preventing Default
    event.preventDefault()
    let name = event.target.name
    let value = event.target.value
    // Helpers for the active class on categories
    if (name === "category") value = event.target.textContent // button name category
    if (name === "color") value = event.target.dataset.color // button name color
    if (name === "price") value = Number(value) // input type="range"
    if (name === 'shipping') value = event.target.checked // Input checkbox

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  // updateFilters fn
  const clearFilters = (event) => {
    // Preventing Default
    event.preventDefault()
    dispatch({ type: CLEAR_FILTERS })
  }

  //#endregion

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
