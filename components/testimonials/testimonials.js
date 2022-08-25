import React from 'react'
import classes from './testimonials.module.css';
import Image from 'next/image';
// import Swiper core and required modules
import {Pagination} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



const data = [
  {
    avatar: "/testimonial1.jpg",
    name: 'Dahye Ahn - AboutHere Data Engineer',
    review: 'One of the very few people you can definitely trust when it comes to tech projects. I\'m running a side project with Christy and her dedication and positive attitude to work boosted the team spirit. Christy will get the work done no matter what and will always delivers the result on time. I decided to run another side project with her because I respect her work ethic and self-motivation. If you are looking for a developer, Christy is absolutely the right one to go with.'
  },
  {
    avatar: "/testimonial2.jpg",
    name: 'Reina Ko - Trip Hero CEO',
    review: 'I built a project with her at a bootcamp and I was absolutely mesmerized by her soft charisma. Thanks to her encouragement and technical help, our team was able to successfully finish the final project which became the best project in the class.'
  },
]

const testimonials = () => {
  return (
    <section id="testimonials">
      <h5>Review from clients</h5>
      <h2>Testimonials</h2>
      <Swiper className={`container ${classes.testimonials__container}`}
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {
          data.map(({avatar, name, review}, index) => {
            return (
              
              <SwiperSlide key={index} className={classes.testimonial}>
                <div className={classes.client__avatar}>
                  <Image src={avatar} alt="" height="400rem" width="400rem"/>
                </div>
                <h5 className={classes.client__name}>{name}</h5>
                <small className={classes.client__review}>
                  {review}
                </small>
              </SwiperSlide>
            )
          })
        }
        
      </Swiper>
    </section>
  )
}

export default testimonials