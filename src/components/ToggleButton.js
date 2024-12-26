import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch, Typography } from '@mui/material';

const ToggleButtonComponent = ({ isSignUp, toggleForm }) => {
  const [toggleValue, setToggleValue] = useState(isSignUp);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
    toggleForm();
  };

  return (
    <div className="flex justify-center gap-2 items-center mt-3">
      <Typography className='font-poppins font-md'>{!isSignUp ? "Don't have an account? Sign up" : "Already have an account? Sign in"}</Typography>
      <Switch
        checked={toggleValue}
        onChange={handleToggle}
        color="primary"
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#FACC15', // Tailwind yellow-400
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#FACC15', // Tailwind yellow-400
          },
        }}
      />
    </div>
  );
};

export default ToggleButtonComponent;
