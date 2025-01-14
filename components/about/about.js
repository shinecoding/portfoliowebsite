import React from 'react'
import classes from './about.module.css';
import Image from 'next/image';
import { FaAward, FaGraduationCap, FaBriefcase, FaConciergeBell } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className={`container ${classes.about__container}`}>
        <div className={classes.about__me}>
          <div className={classes.about__image}>
            <Image src="/me-about.webp" width="500rem" height="500rem" alt="About Image" />
          </div>
        </div>
        <div className={classes.about__content}>
          <div className={classes.about__cards}>
            <article className={classes.about__card}>
              <FaBriefcase className="about__icon" />
              <h5>Experience</h5>
              <small>Software Engineer, 3 Years</small>
            </article>
            <article className={classes.about__card}>
              <FaGraduationCap className="about__icon" />
              <h5>Education</h5>
              <small>MSc Computer Science, Queen Mary University of London</small><br />
              <small>(97th in the world for computer science)</small>
            </article>
            <article className={classes.about__card}>
              <FaAward className="about__icon" />
              <h5>Certification</h5>
              <small>AWS Solutions Architect Associate</small><br />
              <small>AWS Certified Cloud Practitioner</small><br />
              <small>Engineer Information Processing (National Technical Qualification Certificate)</small>
            </article>
            <article className={classes.about__card}>
              <FaConciergeBell className="about__icon" />
              <h5>Service</h5>
              <small>As a skilled software engineer, I can help you build robust and scalable web applications tailored to your needs.</small>
            </article>
          </div>
          <p>

          </p>
          <a href="#contact" className="btn btn-primary">Let&apos;s Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About