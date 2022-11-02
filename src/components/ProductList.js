import React, { Fragment } from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  /* Destructuring of Filter Context */
  const { filtered_products: products, grid_view } = useFilterContext()

  if (grid_view === false) {
    return (
      <ListView products={products} />
    )
  }


  return (
    <Fragment>
      {/* Sorting products */}
      {
        grid_view === false ? (
          <ListView products={products}>product lis</ListView>
        ) : (
          <GridView products={products}>product list</GridView>
        )
      }
      {/* Statement for length of Products */}
      {products.length < 1 ? (
        <h5 style={{ textTransform: 'none' }}>
          Sorry, no product matched your search
        </h5>
      ) : null}
    </Fragment>
  )
}

export default ProductList
