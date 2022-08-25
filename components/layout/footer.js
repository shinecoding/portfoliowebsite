import React from 'react'
import classes from './footer.module.css';

const footer = () => {
  return (
    <footer className={classes.footer}>
      <a href="#" className={classes.footer__logo}>Christy Choi</a>
      <ul className={classes.permalinks}>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={classes.footer__copyright}>
        <small>&copy; Christy Choi. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default footer