import React from 'react'
import CardDeck from './CardDeck'
import About from './About'
import KeyFeatures from './KeyFeatures'

const Main = ({scrollPosition}) => {
  return (
    <div className='flex flex-col items-start px-[32px] py-[24px] bg-[#FBF9F1] w-screen h-screen '>
        <About />   
    </div>
  )
}

export default Main