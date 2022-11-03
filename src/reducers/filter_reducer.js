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

  //#region Loading Actions

  /* LOAD_PRODUCTS */
  if (action.type === LOAD_PRODUCTS) {
    // Find out the max value of array
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    // Find out the min value of array
    let minPrice = action.payload.map((p) => p.price)
    minPrice = Math.min(...minPrice)

    // Update the current state
    return {
      ...state,
      all_products: [...action.payload], // Update the previous empty array
      filtered_products: [...action.payload], // Update the previous empty array
      filters: {
        ...state.filters,
        min_price: minPrice, // Update the min price
        max_price: maxPrice, // Update the max price 
        price: maxPrice // Update the price
      }
    }
  }

  //#endregion 

  //#region Views Actions

  /* SET_LISTVIEW */
  if (action.type === SET_LISTVIEW) return { ...state, grid_view: false }
  /* SET_GRIDVIEW */
  if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true }

  //#endregion 

  //#region Sorting Actions

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

  //#endregion 

  //#region Filters Actions

  /* UPDATE_FILTERS */
  if (action.type === UPDATE_FILTERS) {
    // Destructuring of action
    const { name, value } = action.payload
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }
  /* FILTER_PRODUCTS */
  if (action.type === FILTER_PRODUCTS) {
    // Take the all_products from state
    const { all_products } = state
    // Take all props from the filters
    const { text, category, company, color, price, shipping } = state.filters

    // Pass it to a new variable "tempProducts" with spread operator
    let tempProducts = [...all_products]

    // Filter the products by text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    // Filter the products by company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.company === company
      })
    }
    // Filter the products by category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.category === category
      })
    }
    // Filter the products by colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => {
        return product.colors.find((c) => c === color)
      })
    }
    // Filter the products by price
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price
    })
    // Filter the products by shipping
    if (shipping) {
      tempProducts = tempProducts.filter(product => {
        // Return only the shipping value with true
        return product.shipping === true
      })
    }

    // Return the spread of state and the filtered products with the value of tempProducts
    return { ...state, filtered_products: tempProducts }
  }

  /* CLEAR_FILTERS */
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      // Filters object with his initial Value
      filters: {
        ...state.filters,
        text: '',  // Initial state of text was set as an empty string
        company: 'all', // Initial state of company was set as all
        category: 'all', // Initial state of category was set as all
        color: 'all', // Initial state of color was set as all
        price: state.filters.max_price, // Initial state of price was set as max_price
        shipping: false // Initial state of shipping was set as a boolean value
      },
    }
  }

  //#endregion 

  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
