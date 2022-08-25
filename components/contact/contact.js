import React from 'react'
import classes from './contact.module.css';
import {MdOutlineEmail} from 'react-icons/md';
import {RiMessengerLine} from 'react-icons/ri';
import {BsWhatsapp} from 'react-icons/bs';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.SERVICE_ID, process.env.TEMPLATE_ID, form.current, process.env.PUBLIC_KEY)
  }


  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>
      <div className={`container ${classes.contact__container}`}>
        <div className={classes.contact__options}>
          <article className={classes.contact__option}>
            <MdOutlineEmail className={classes.contact__icon}/>
            <h4>Email</h4>
            <a href="mailto:christychoi.dev@gmail.com" target="_blank">Send a message</a>
          </article>
          <article className={classes.contact__option}>
            <RiMessengerLine className={classes.contact__icon}/>
            <h4>1:1 Kakao Chat</h4>
            <a href="https://open.kakao.com/o/svGAvLxe" target="_blank">Send a message</a>
          </article>
          <article className={classes.contact__option}>
            <BsWhatsapp className={classes.contact__icon}/>
            <h4>Whatsapp</h4>
            <a href="https://api.whatsapp.com/send?phone+821076755535">Send a message</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail} className={classes.form}>
        <input type="text" name="name" className={classes.input} placeholder='Your Full Name' required />
        <input type="email" name="email" className={classes.input} placeholder="Your Email" required />
        <textarea name="message" className={classes.textarea} id="" cols="30" rows="7" placeholder="Your Message" required ></textarea>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
      </div>
      
    </section>
  )
}

export default Contact