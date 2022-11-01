import React, { useContext } from 'react'
import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

const FeaturedProducts = () => {

  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured
  } = useProductsContext()

  // If statement for loading case
  if (loading) return <Loading />
  // If statement for error case
  if (error) return <Error />
  // If statement for error case
  // if (featured) return <Product />


  return (
    /* section */
    <Wrapper className="section">
      {/* title */}
      <div className="title">
        <h2>Featured Products</h2>
        {/* underline */}
        <div className="underline"></div>
      </div>
      {/* section-center featured */}
      <div className="section-center featured">
        {
          featured.slice(0, 3).map(item => {
            return (
              <Product key={item.id} {...item} />
            )
          })
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
