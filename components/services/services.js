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
              <p><b>Responsive Web Design</b>: Crafting fluid and responsive web layouts that adapt seamlessly across devices and screen sizes, ensuring an optimal user experience for all users.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>User Interface (UI) Development</b>: Translating design mockups into pixel-perfect, interactive UIs using modern HTML, CSS, and JavaScript frameworks, paying attention to detail and consistency.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Integration with APIs</b>: Incorporating data and functionality from backend APIs, ensuring seamless communication between the frontend and backend systems.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Interactive Web Elements</b>: Building dynamic and engaging components such as sliders, carousels, accordions, and modals to keep users engaged and enhance the interactivity of your web application.</p>
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
              <p><b>API Development</b>: Designing and building RESTful or GraphQL APIs that serve as the backbone of your applications, enabling seamless communication between the frontend and backend.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Server Logic</b>: Database Architecture: Developing well-structured database schemas, leveraging both SQL and NoSQL databases, to ensure efficient data storage, retrieval, and management.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Server Logic: </b>Implementing intricate business logic and algorithms on the server side to handle complex tasks, calculations, and data manipulations.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Authentication and Security</b>: Integrating secure authentication and authorization mechanisms to safeguard user data and restrict access to sensitive functionalities.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Performance Optimization</b>: Profiling and optimizing backend code to ensure swift response times, minimal latency, and efficient resource utilization, even under heavy loads.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>API Documentation</b>: Creating clear and comprehensive API documentation for developers and external partners, making integration and collaboration seamless.</p>
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
              <p><b>Cloud Architecture</b>: Designing cloud-native architectures that leverage the power of leading cloud providers like AWS enabling flexibility, scalability, and cost-effectiveness.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Containerization</b>: Implementing Docker to streamline deployment, scaling, and management of applications in containerized environments.</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p><b>Server Provisioning and Configuration</b>: Setting up new Linux servers with the appropriate operating system, configuring networking, security settings, and essential software packages.</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Services