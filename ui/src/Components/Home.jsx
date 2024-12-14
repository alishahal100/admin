import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import TurfReel from './TurfReel'
import Texts from './Texts'
import Footer from './Footer'
import Cardimg from './Cardimg'


const Home = () => {
  return (
    <div className=''>
      <Navbar/>
      <Banner/>
      <Cardimg/>
    
      <TurfReel/> 
      {/* <Texts/> */}
      <Footer/>
    </div>
  )
}

export default Home
