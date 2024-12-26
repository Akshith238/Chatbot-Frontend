import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, Toolbar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import NavBar from './NavBar';
import Overview from './Overview';
import Settings from './Settings';
import Inspect from './Inspect';
import Report from './Report';
import Explore from './Explore';
import Document from './Document';
import ChatBot from './Overview';

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('Overview')
  const [activeReportId,setActiveReportId]=useState('')
  const renderComponent = () => {
    switch (selectedItem) {
      case 'Overview':
        return <ChatBot setSelectedItem={setSelectedItem} setActiveReportId={setActiveReportId}/>;
      case 'Settings':
        return <Settings />;
      case 'Explore':
        return <Explore setSelectedItem={setSelectedItem} setActiveReportId={setActiveReportId}/>
      case 'Document':
        return <Document setSelectedItem={setSelectedItem} activeReportId={activeReportId}/>
      case 'Inspect':
        return <Inspect setSelectedItem={setSelectedItem} setActiveReportId={setActiveReportId}/>
      case 'Report':
        return <Report id={activeReportId} />
      default:
        return <Overview setSelectedItem={setSelectedItem} setActiveReportId={setActiveReportId} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }} className='bg-[#F6F5F2]'>
      <CssBaseline />
      <Drawer
        variant='permanent'
        className='bg-slate-900'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',background:'#0f172a' },
        }}
      >
        <Toolbar>
            <Link to='/'
                className="font-poppins font-semibold text-2xl text-white self-center"
            >
            DocMind
            </Link>
        </Toolbar>
        
        <Box className='p-3'>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="space-y-4"
          >
            <Button
              variant='contained'
              className={`w-full font-poppins text-black bg-[#F6F5F2] rounded-lg hover:bg-[#e6e0cf] ${selectedItem === 'Overview' ? 'bg-[#e6e0cf]' : ''}`}
              onClick={() => setSelectedItem('Overview')}
            >
              Chat Interface
            </Button>
            {/* <Button
              variant='contained'
              className={`w-full font-poppins text-black bg-[#F6F5F2] rounded-lg hover:bg-[#e6e0cf] ${selectedItem === 'Explore' ? 'bg-[#e6e0cf]' : ''}`}
              onClick={() => setSelectedItem('Explore')}
            >
              Explore
            </Button> */}
            {/* <Button
              onClick={() => setSelectedItem('Settings')}
              className={`w-full font-poppins text-black bg-[#F6F5F2] rounded-lg hover:bg-[#e6e0cf] ${selectedItem === 'Settings' ? 'bg-[#e6e0cf]' : ''}`}
              variant="contained"
            >
              Settings
            </Button> */}
          </motion.div>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <NavBar />
        <motion.div
          key={selectedItem} // Key to ensure smooth animation when switching components
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {renderComponent()}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;
