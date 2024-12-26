import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Settings = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., save data to backend)
    console.log(userData); // Replace with your logic
    // Optionally, you can navigate to another page or show a success message
  };

  return (
    <Box className="p-4 space-y-4 font-poppins h-screen">
      <Typography variant="h4" className="text-2xl text-slate-900 font-poppins font-bold">
        User Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          className="mb-4 font-poppins"
          value={userData.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          className="mb-4 font-poppins"
          value={userData.lastName}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          className="mb-4 font-poppins"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone Number"
          variant="outlined"
          fullWidth
          className="mb-4 font-poppins"
          value={userData.phone}
          onChange={handleChange}
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          fullWidth
          className="mb-4 font-poppins"
          value={userData.address}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="text-white font-poppins bg-slate-900"
        >
          Save Profile
        </Button>
      </form>
    </Box>
  );
};

export default Settings;
