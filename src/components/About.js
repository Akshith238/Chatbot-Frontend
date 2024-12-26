import { Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col gap-[8px] p-8'>
        <Typography className='font-poppins text-4xl font-semibold text-black'>About DocMind</Typography>
        <Typography className='font-poppins font-medium text-xl text-black'>
        DocMind is an intelligent document assistant that analyzes multiple PDF documents simultaneously to provide accurate, context-aware answers to your questions. Powered by advanced natural language processing, it seamlessly connects information across documents to deliver comprehensive insights from your entire document collection. Whether you're researching, analyzing reports, or seeking specific information, DocMind helps you quickly extract relevant knowledge from your PDF library
        </Typography>
    </div>
  )
}

export default About