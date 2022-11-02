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

const products_reducer = (state, action) => {

  // console.log("This is my Obj state, created in product_context.js");
  // console.log(state);

  /* SIDEBAR_OPEN */
  if (action.type === SIDEBAR_OPEN) return { ...state, isSidebarOpen: true }
  /* SIDEBAR_CLOSE */
  if (action.type === SIDEBAR_CLOSE) return { ...state, isSidebarOpen: false }

  /* GET_PRODUCTS_BEGIN  */
  if (action.type === GET_PRODUCTS_BEGIN) return { ...state, products_loading: true, products_error: false, }
  /* GET_PRODUCTS_ERROR  */
  if (action.type === GET_PRODUCTS_ERROR) return { ...state, products_error: true, products_loading: false }
  /* GET_PRODUCTS_SUCCESS  */
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // I filter the action.payload (that, in the useContext was setted as products)
    const featured_products = action.payload.filter(
      product => product.featured === true
    )
    console.log(featured_products);
    return { ...state, products_loading: false, products: action.payload, featured_products }
  }

  /* GET_SINGLE_PRODUCT_BEGIN  */
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) return { ...state, single_product_loading: true, single_product_error: false, }
  /* GET_PRODUCTS_ERROR  */
  if (action.type === GET_SINGLE_PRODUCT_ERROR) return { ...state, single_product_error: true, single_product_loading: false }
  /* GET_SINGLE_PRODUCT_SUCCESS */
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: false,
      single_product: action.payload
    }
  }

  /* IF NO ACTION FOUND */
  if (!action.type) throw new Error(`No Matching "${action.type}" - action type`)


  return state
}

export default products_reducer
