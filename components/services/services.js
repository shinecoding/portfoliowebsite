import React from 'react'
import classes from './services.module.css';
import {BiCheck} from 'react-icons/bi';


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
              <p>drew layouts and displays with HTML, CSS, Bootstrap</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>built frontends primarily using JavaScript, JQuery, Next.js</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>SEO optimized website with SSR</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>refactored 5,000+ lines of legacy code</p>
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
              <p>built a production level web application from scratch</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>developed with REST APIs, CRUD, Signals, Channels(Web Socket), Selenium, Pytest, etc</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>comfortable with both ORMs and RDBMS</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>refactored 5,000+ lines of legacy code</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>comfortable writing complex, stacked queries using any database</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>implemented cache to decrease server load / increase performance</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB DEVELOPMENT */}
        <article className={classes.service}>
          <div className={classes.service__head}>
            <h3>Infrastructure</h3>
          </div>
          <ul className={classes.service__list}>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>deployed and configured with Elastic beanstalk, EC2, S3, RDS, Route53, IAM, Certified Manager</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>proficiency in basic DevOps procedures and security best practices (e.g. IAM, MFA, SSL)</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>wrote simple dockerfile and docker-compose file and pushed to the dockerhub</p>
            </li>
            <li>
              <BiCheck className={classes.service__icon} />
              <p>used linux to configure</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Services