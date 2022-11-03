import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// Domain => dev-gx7ypnxahibu0t27.us.auth0.com
// Client ID => O1KJzQivg3oHUcO9mgG5kNqAiBU4iAfC


ReactDOM.render(

    <Auth0Provider
        domain='dev-gx7ypnxahibu0t27.us.auth0.com'
        clientId='O1KJzQivg3oHUcO9mgG5kNqAiBU4iAfC'
        redirectUri={window.location.origin}
        cacheLocation="localstorage">
        {/* UserProvider */}
        <UserProvider>
            {/* ProductsProvider */}
            <ProductsProvider>
                {/* FilterProvider */}
                <FilterProvider>
                    {/* CartProvider */}
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>

    , document.getElementById('root')
)
