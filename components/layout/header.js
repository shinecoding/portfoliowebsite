import React from 'react'
import classes from './header.module.css';
import CTA from './CTA';
import Image from 'next/image'
import HeaderSocials from './headersocials';


const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.header__container}`}>
        <h5 className="text-light">Hello I&apos;m</h5>
        <h1>Christy Choi</h1>
        <h5 className="text-light-margin">Fullstack Developer based in London</h5>
        <CTA />
        <HeaderSocials />
        <div className={classes.me}>
          <Image src="/me.webp" alt="me" width="450rem" height="680rem" />
        </div>
        <a href="#contact" className={classes.scroll__down}>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header