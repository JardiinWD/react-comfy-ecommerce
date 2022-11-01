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

  console.log("This is my Obj state, created in product_context.js");
  console.log(state);

  /* SIDEBAR_OPEN */
  if (action.type === SIDEBAR_OPEN) return { ...state, isSidebarOpen: true }
  /* SIDEBAR_CLOSE */
  if (action.type === SIDEBAR_CLOSE) return { ...state, isSidebarOpen: false }
  /* GET_PRODUCTS_BEGIN  */
  if (action.type === GET_PRODUCTS_BEGIN) return { ...state, products_loading: true }
  /* GET_PRODUCTS_SUCCESS  */
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // I filter the action.payload (that, in the useContext was setted as products)
    const featured_products = action.payload.filter(
      product => product.featured === true
    )
    console.log(featured_products);
    return { ...state, products_loading: false, products: action.payload, featured_products }
  }
  /* GET_PRODUCTS_ERROR  */
  if (action.type === GET_PRODUCTS_BEGIN) return { ...state, products_error: true }

  /* NO ACTION FOUNDED */
  if (!action.type) throw new Error(`No Matching "${action.type}" - action type`)


  return state
}

export default products_reducer
