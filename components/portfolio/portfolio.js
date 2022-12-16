import React from 'react'
import classes from './portfolio.module.css';
import Image from 'next/image';

const data = [
  {
    id: 2,
    image: '/portfolio2.png',
    title: 'Recycling Platform',
    detail: 'https://www.notion.so/Suggest-Recommend-Page-2340463a065c4964b4f6ccc6cb41284b'
  },
  {
    id: 3,
    image: '/portfolio3.png',
    title: 'Suggest Recommend Page',
    detail: 'https://www.notion.so/Morpheme-Analytics-Tool-5baabb8713c34433bde8594a24ddb17b'
  },
  {
    id: 4,
    image: '/portfolio4.png',
    title: 'Morpheme Analytics Tool',
    detail: 'https://www.notion.so/Morpheme-Analytics-Tool-5baabb8713c34433bde8594a24ddb17b'
  },
  {
    id: 5,
    image: '/portfolio5.png',
    title: 'Meetingroom Booking Service',
    detail: 'https://www.notion.so/Meetingroom-Booking-Service-0c18561210a24f2495213c3edb62d73d'
  },
  {
    id: 6,
    image: '/portfolio6.png',
    title: 'Baby Sitting Platform',
    github: 'https://github.com/shinecoding/DolbomMon',
    detail: '/portfolio_dolbommon.pdf'
  }
]


const portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className={`container ${classes.portfolio__container}`}>
        {
          data.map(({id, image, title, github, detail}) => {
            return (
              <article key={id} className={classes.portfolio__item}>
                <div className={classes.portfolio__image}>
                  <Image src={image} alt="portfolio" height="400rem" width="500rem"/>
                </div>
                  <h3>{title}</h3>
                  <div className={classes.portfolio__cta}>
                    {github && <a href={github} className="btn" target="_blank" rel="noreferrer">Github</a>}
                    {detail && <a href={detail} className="btn btn-primary" target="_blank" rel="noreferrer">Detail</a>}
                    
                  </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default portfolio