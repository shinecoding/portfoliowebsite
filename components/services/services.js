import React from 'react'
import classes from './services.module.css';
import { BiCheck } from 'react-icons/bi';


const Services = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>
      <div className={`container ${classes.services__container}`}>
        <article className={classes.service}>
          <div className={classes.service__head}>
            <h3>Frontend Development</h3>
          </div>
          <ul className={classes.service__list}>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Responsive Web Design</b>: Crafting responsive web layouts that adapt seamlessly across devices and screen sizes, ensuring an optimal user experience for all users.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Integration with APIs</b>: Incorporating data and functionality from backend APIs, ensuring seamless communication between the frontend and backend systems.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Interactive Web Elements</b>: Building dynamic components to keep users engaged and enhance the interactivity.</p>
            </li>
          </ul>
        </article>
        {/* END OF UI/UX */}
        <article className={classes.service}>
          <div className={classes.service__head}>
            <h3>Backend Development</h3>
          </div>
          <ul className={classes.service__list}>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>API Development</b>: Designing and building RESTful APIs that serve as the backbone of your applications, enabling seamless communication between the frontend and backend.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Database Architecture</b>: Developing well-structured database schemas to ensure efficient data storage, retrieval, and management.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Performance Optimisation</b>: Profiling and optimising backend code to ensure swift response times, minimal latency, and efficient resource utilisation.</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB DEVELOPMENT */}
        <article className={classes.service}>
          <div className={classes.service__head}>
            <h3>Cloud Infrastructure</h3>
          </div>
          <ul className={classes.service__list}>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Cloud Architecture</b>: Designing AWS cloud architectures that enables flexibility, scalability, and cost-effectiveness.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Containerisation</b>: Implementing Docker to streamline deployment, scaling, and management of applications in containerized environments.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Server Provisioning and Configuration</b>: Setting up servers on operating systems, configuring networking, security settings, and essential software packages.</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Services