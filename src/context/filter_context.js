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
  sort: 'price-lowest' // Initial state of sort as a string (Option value)
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  // Destructuring of context
  const { products } = useProductsContext()
  // useReducer method
  const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])


  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort])

  // Callback fn for sorting the products as a grid
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  // Callback fn for sorting the products as a list
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

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

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
