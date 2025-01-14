import React, { useState } from 'react'
import classes from './nav.module.css';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiBookAlt, BiMessageSquareDetail } from 'react-icons/bi';
import { RiServiceLine } from 'react-icons/ri';


const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');

  return (
    <nav className={classes.nav}>
      <a href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? classes.active : ''}><AiOutlineHome /></a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? classes.active : ''}><AiOutlineUser /></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? classes.active : ''}><BiBookAlt /></a>
      <a href="#services" onClick={() => setActiveNav('#services')} className={activeNav === '#services' ? classes.active : ''}><RiServiceLine /></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? classes.active : ''}><BiMessageSquareDetail /></a>
    </nav>
  )
}

export default Nav