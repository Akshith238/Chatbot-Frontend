import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBlob = () => {
  return (
    <motion.div
      initial={{}}
      animate={{
        rotate: [0, 180],
        scale: [0.9,1,0.9],
        transition: {
          duration: 4,
          ease: 'easeInOut',
          times: [0, 1],
        },
      }}
      className='w-1/2'
    >
      <svg id='sw-js-blob-svg'  viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <defs>
            <linearGradient id='sw-gradient' x1='0' x2='1' y1='1' y2='0'>
            <stop id='stop1' stopColor='rgba(129, 104, 157, 1)' offset='0%' />
            <stop id='stop2' stopColor='rgba(0, 0, 0, 1)' offset='100%' />
            </linearGradient>
        </defs>
        <motion.path
            fill='url(#sw-gradient)'
            d='M20.2,-36C26,-31.5,30.7,-26,35.3,-19.8C40,-13.6,44.7,-6.8,44.7,0C44.8,6.9,40.3,13.7,35.9,20.4C31.5,27.1,27.4,33.6,21.4,37.3C15.5,41,7.7,41.7,-0.2,42.2C-8.2,42.6,-16.4,42.6,-22.9,39.3C-29.3,35.9,-34,29.1,-37.5,22C-40.9,14.9,-43.1,7.4,-43.7,-0.3C-44.3,-8.1,-43.3,-16.3,-39.4,-22.6C-35.4,-28.8,-28.6,-33.3,-21.5,-37C-14.5,-40.8,-7.2,-43.8,-0.1,-43.8C7.1,-43.7,14.3,-40.4,20.2,-36Z'
            width='100%'
            height='100%'
            transform='translate(50 50)'
            strokeWidth='2'
            stroke='url(#sw-gradient)'
        ></motion.path>
        </svg>

    </motion.div>
  );
};

export default AnimatedBlob;
