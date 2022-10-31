import React, { Fragment } from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'

const HomePage = () => {
  return (
    <Fragment>
      {/* Hero */}
      <Hero />
      {/* FeaturedProducts */}
      <FeaturedProducts />
      {/* Services */}
      <Services />
      {/* Contact */}
      <Contact />
    </Fragment>
  )
}

export default HomePage
