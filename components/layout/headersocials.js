import React from 'react'
import {BsLinkedin} from 'react-icons/bs';
import {FaGithub} from 'react-icons/fa';
import {SiHashnode} from 'react-icons/si';
import Link from 'next/link';
import classes from './header.module.css';


const HeaderSocials = () => {
  return (
    <div className={classes.header__socials}>    
        <a href="https://www.linkedin.com/in/christy-choi-dev/" target="_blank"><BsLinkedin/></a>
        <a href="https://github.com/shinecoding" target="_blank"><FaGithub/></a>
        <a href="https://christychoi.hashnode.dev" target="_blank"><SiHashnode/></a>
    </div>
  )
}


export default HeaderSocials