import React from 'react'
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import Nav from './nav';


const layer = ({children}) => {
  return (
    <div>
        <Head>

        </Head>

        <Header />
        <Nav />
        {children}
        <Footer/>

    </div>
  )
}

export default layer