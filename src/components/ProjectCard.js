import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectCard = () => {
  return (
    <Card className='bg-black text-white'>
      <CardContent>
        <Typography variant="h5" component="h2">
          Card Title
        </Typography>
        <Typography color="textSecondary">
          Subtitle or additional information
        </Typography>
        <Typography variant="body2" component="p">
          Content of the card goes here. You can put any text or components.
        </Typography>
      </CardContent>
      <div className='bg-white h-10'>

      </div>
    </Card>
  );
};

export default ProjectCard;