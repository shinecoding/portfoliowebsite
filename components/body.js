import React from 'react'
import About from './about/about';
import Experience from './experience/experience'
import Services from './services/services';
import Portfolio from './portfolio/portfolio';
import Testimonials from './testimonials/testimonials';
import Contact from './contact/contact';

const Body = () => {
  return (
    <>
      <About />
      <Experience />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  )
}

export default Body