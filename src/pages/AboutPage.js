import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      {/* Page hero component */}
      <PageHero title="about" />
      {/* Wrapper Component */}
      <Wrapper className="page section section-center">
        {/* Image */}
        <img src={aboutImg} alt="Hero" />
        <article>
          {/* title */}
          <div className="title">
            <h2>Our story</h2>
            {/* underline */}
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed magna non enim mattis elementum ac et tortor.
            Donec non ante massa. Mauris egestas metus diam, at pretium purus scelerisque non. Nullam finibus pulvinar ante in molestie.
            Donec malesuada at eros ut lacinia. Ut ornare faucibus libero, a scelerisque neque.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
