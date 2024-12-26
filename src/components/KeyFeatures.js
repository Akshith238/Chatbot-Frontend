import { Typography } from '@mui/material';
import React from 'react';

const keyFeatures = [
  {
    title: 'Automated Report Generation',
    description: 'Automatically generate detailed documentation for VBA macros and Excel files with minimal user input.',
  },
  {
    title: 'Error Detection and Correction',
    description: 'Detect and rectify errors within VBA code to ensure robust functionality and reliability.',
  },
  {
    title: 'Efficiency Analysis',
    description: 'Analyze the efficiency and performance metrics of VBA macros to optimize workflow and resource utilization.',
  },
  {
    title: 'Dependency Mapping',
    description: 'Map dependencies between VBA macros and associated Excel files for clear understanding and management of interdependencies.',
  },
  {
    title: 'Data Flow Analysis',
    description: 'Visualize and analyze the data flow within VBA macros to enhance data integrity and security measures.',
  },
  {
    title: 'Modernization Recommendations',
    description: 'Provide recommendations for modernizing VBA macros to align with current industry standards and best practices.',
  },
];
  
const KeyFeatures = () => {
  return (
    <div className='flex flex-col gap-[8px] p-8'>
      <Typography className='font-poppins text-4xl font-semibold text-black'>Key Features</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {keyFeatures.map((feature, index) => (
          <div key={index} className='bg-slate-900 p-4 rounded-lg shadow-lg'>
            <Typography className='font-poppins text-2xl font-semibold text-white mb-2'>{feature.title}</Typography>
            <Typography className='font-poppins font-medium text-lg text-gray-300'>{feature.description}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
