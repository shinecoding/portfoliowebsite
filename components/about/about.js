import React from 'react'
import classes from './about.module.css';
import Image from 'next/image';
import {FaAward} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import {VscFolderLibrary} from 'react-icons/vsc';

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className={`container ${classes.about__container}`}>
        <div className={classes.about__me}>
          <div className={classes.about__image}>
          <Image src="/me-about.png" width="500rem" height="500rem" alt="About Image"/>
          </div>
        </div>
        <div className={classes.about__content}>
          <div className={classes.about__cards}>
            <article className={classes.about__card}>
              <FaAward className="about__icon"/>
              <h5>Experience</h5>
              <small>3 Years</small><br/>
              <small>software engineer</small>
            </article>
            <article className={classes.about__card}>
              <FiUsers className="about__icon"/>
              <h5>Certificate</h5>
              <small>Engineer Information Processing (National Technical Qualification Certificate)</small>
            </article>
            <article className={classes.about__card}>
              <VscFolderLibrary className="about__icon"/>
              <h5>Education</h5>
              <small>Intensive Web Development Course</small><br/>
              <small>Ewha Womans University</small>
            </article>
          </div>
          <p>
          I consider myself a lifelong learner, that&apos;s the reason I&apos;m in tech. My primary focus is developing production-quality fullstack applications. I&apos;ve worked in all stages of web development, from software design to frontend, backend, and dev-ops.
          </p>
          <a href="#contact" className="btn btn-primary">Let&apos;s Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About