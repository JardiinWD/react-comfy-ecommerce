import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'

const Nav = () => {
  // Destructuring of useProduct Context
  const { openSidebar } = useProductsContext()
  // Destructuring of useUser Context
  const { myUser } = useUserContext()

  return (
    <NavContainer>
      {/* nav-center */}
      <div className="nav-center">
        {/* nav-header */}
        <div className="nav-header">
          {/* Link / Logo */}
          <Link to="/">
            <img src={logo} alt="E-commerce Logo" />
          </Link>
          {/* nav-toggle / FaBars */}
          <button type='button' className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        {/* nav-links */}
        <ul className="nav-links">
          {
            links.map(link => {
              // Destructuring of Link
              const { id, text, url } = link
              return (
                /* Id */
                <li key={id}>
                  {/* Url */}
                  <Link to={url}>
                    {text}
                  </Link>
                </li>
              )
            })
          }
          {
            myUser && (
              <li>
                <Link to="/checkout">
                  Checkout
                </Link>
              </li>
            )
          }
        </ul>
        {/* CartButtons */}
        <CartButtons />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav
