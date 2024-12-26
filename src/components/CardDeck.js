import React ,{useEffect} from 'react';
import { Grid } from '@mui/material';
import ProjectCard from './ProjectCard';
import Aos from 'aos';

const CardDeck = () => {
    useEffect(() => {
        Aos.init();
      }, [])
  
  return (
    <Grid 
    className='py-10 px-5 justify-center items-center'
    container 
    spacing={8}>
      <Grid item className='w-1/4' data-aos="fade-right" data-aos-duration="1000">
        <ProjectCard/>
      </Grid>
      <Grid item className='w-1/4'  data-aos="fade-down" data-aos-duration="1000">
        <ProjectCard/>
      </Grid>
      <Grid item className='w-1/4' data-aos="fade-left" data-aos-duration="1000">
        <ProjectCard />
      </Grid>
    </Grid>
  );
};

export default CardDeck;
