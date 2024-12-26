import React from 'react'
import NavBar from './NavBar';
import Hero from './Hero';
import Main from './Main';
import { useState,useEffect } from 'react';
import Loader from './Loader';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading,setLoading]=useState(true);
  
    useEffect(()=>{
      setTimeout(()=>{
         setLoading(false);
      },2000)
    },[])

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <div>
      {isLoading?(
        <Loader />
      ):(
        <div className='flex flex-col'>
            <NavBar scrollPosition={scrollPosition} setScrollPosition={setScrollPosition} />
            <Hero scrollPosition={scrollPosition}/>
            <Main scrollPosition={scrollPosition}/>
        </div>
      )}
    </div>
  )
}

export default Home