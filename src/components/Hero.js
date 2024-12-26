import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import { Button, Typography } from '@mui/material';
import TypingText from './TypingText';
import { useNavigate } from 'react-router-dom';

const Hero = ({ scrollPosition }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        Aos.init();
    }, []);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div
            className={`flex flex-col gap-8 fixed-top w-screen transition-all duration-200 shadow-2xl items-center justify-center bg-cover bg-center h-[100vh] ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/light.jpg)` }}
        >
            <div className='flex items-center'>
                <TypingText text="DocMind" data-aos="fade-up" data-aos-duration="2000" />
            </div>
            <Typography variant='h4' data-aos="fade-up" data-aos-duration="1000" className='text-center font-bold font-poppins text-slate-900'>
                Your documents, your answers, instant wisdom            
            </Typography>
            <Button onClick={() => navigate('/inspect')} variant='filled' data-aos="fade-up" className='rounded-md text-white font-poppins bg-slate-900 hover:bg-grey'>
                Get started
            </Button>
            <img src={`${process.env.PUBLIC_URL}/light.jpg`} onLoad={handleImageLoad} style={{ display: 'none' }} alt="background" />
        </div>
    );
}

export default Hero;
