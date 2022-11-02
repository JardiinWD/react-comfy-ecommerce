import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'




const SingleProductPage = () => {

  // I set an ID with useParams
  const { id } = useParams()
  // console.log(id);
  // I set history variable with useHistory  
  const history = useHistory()

  // useContext destructuring
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct, // My fn for single product
  } = useProductsContext()


  // useEffect callback fn for Fetch
  const fetchHandling = () => {
    // I invoke fetchSingleProducts fn in useEffect hook
    fetchSingleProduct(`${url}${id}`)
    // Use the "id" (useParam) as a dependency
  }
  // useEffect method
  useEffect(fetchHandling, [id])

  // useEffect callback fn for Error Handling
  const errorHandling = () => {
    // If statement for error case
    if (error) {
      // Redirect the user at the home after 3s
      setTimeout(() => history.push('/'), 3000)
    }
  }
  // useEffect method 
  useEffect(errorHandling, [error])

  // If statement for loading case
  if (loading) return <Loading />
  // If statement for error case
  if (error) return <Error />

  // Destructuring of product
  const { name, price, description, stock, stars, reviews, id: sku, company, images } = product

  return (
    <Wrapper>
      {/* PageHero component */}
      <PageHero title={name} product />
      {/* section section-center page */}
      <div className="section section-center page">
        {/* btn */}
        <Link to="/products" className="btn">
          back to products
        </Link>
        {/* product-center */}
        <div className="product-center">
          {/* ProductImages component */}
          <ProductImages images={images} />
          {/* content */}
          <section className="content">
            {/* name */}
            <h2>{name}</h2>
            {/* Stars component */}
            <Stars stars={stars} reviews={reviews} />
            {/* Price */}
            <h5 className="price">{formatPrice(price)}</h5>
            {/* description */}
            <p className="desc">{description}</p>
            {/* info / Stock */}
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            {/* info / SKU */}
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            {/* info / Brand */}
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            {/* Horizontal Rule */}
            <hr />
            {/* AddToCart component */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
