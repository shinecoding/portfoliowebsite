import React from 'react'
import classes from './experience.module.css';
import {BsFillPatchCheckFill} from 'react-icons/bs';


const Experience = () => {
  return (
    <section id="experience">
      <h5>The Skills I have</h5>
      <h2>My Experience</h2>

      <div className={`container ${classes.experience__container}`}>
        <div className="experience__frontend">
          <h3>Frontend Development</h3>
          <div className={classes.experience__content}>
          <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>React Native</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>React</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>Next.js</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>JavaScript</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>HTML&CSS</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>JQuery</h4>
                
              </div>
            </article>
          </div>
        </div> 
        <div className={classes.experience__backend}>
        <h3>Backend Development</h3>
        <div className={classes.experience__content}>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>Django</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>Python</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>AWS</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>PostgreSQL</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>Java</h4>
                
              </div>
            </article>
            <article className={classes.experience__details}>
              <BsFillPatchCheckFill className={classes.experience__icon} />
              <div>
                <h4>Spring</h4>
                
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience