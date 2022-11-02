import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  /* LOAD_PRODUCTS */
  if (action.type === LOAD_PRODUCTS) {
    // Update the current state
    return {
      ...state,
      all_products: [...action.payload], // Update the previous empty array
      filtered_products: [...action.payload] // Update the previous empty array
    }
  }

  /* SET_LISTVIEW */
  if (action.type === SET_LISTVIEW) return { ...state, grid_view: false }
  /* SET_GRIDVIEW */
  if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true }

  /* SET_GRIDVIEW */
  if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true }
  /* UPDATE_SORT */
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }
  /* SORT_PRODUCTS */
  if (action.type === SORT_PRODUCTS) {
    /* Destructuring of state */
    const { sort, filtered_products } = state
    // Created an empty array, for pushing my filtered_products
    let tempProducts = [...filtered_products]
    // Check if the option in set was changing in price-lowest
    if (sort === 'price-lowest') {
      // Sorting tempProducts based on the option value
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price
      })
    }
    // Check if the option in set was changing in price-highest
    if (sort === 'price-highest') {
      // Sorting tempProducts based on the option value
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    // Check if the option in set was changing in name-a
    if (sort === 'name-a') {
      // Sorting tempProducts based on the option value
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    // Check if the option in set was changing in name-z
    if (sort === 'name-z') {
      // Sorting tempProducts based on the option value
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
