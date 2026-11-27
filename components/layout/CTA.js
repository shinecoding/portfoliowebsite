import React from 'react'
// import CV from '../../assets/cv.pdf';

const CTA = () => {
  return (
    <div className='cta'>
      <a href='/cv.pdf' download="Christy_Choi_CV.pdf" className="btn">Download CV</a>
      <a href="#contact" className="btn btn-primary">Let&apos;s Talk</a>
    </div>
  )
}

export default CTA