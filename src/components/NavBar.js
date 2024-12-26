import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Tooltip } from '@mui/material';
import { MenuOutlined, CloseOutlined, ExitToApp, Logout } from '@mui/icons-material'; // Import the ExitToApp icon
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { motion } from 'framer-motion';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const NavBar = ({ scrollPosition, setScrollPosition }) => {
    const [user, setUser] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user);
            } else {
                console.log("user logged out");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div>
            <AppBar
                className={`bg-slate-950 `}
                position='fixed'
                elevation={7}
            >
                <Toolbar className='flex gap-3 justify-end'>
                <Tooltip title="Sign Out" arrow>
                        <IconButton
                            color='inherit'
                            onClick={handleSignOut}
                            className={`transition-transform hover:-translate-y-1 duration-300 hover:bg-white hover:text-black`}
                        >
                            <Logout className=' rotate-180'/>
                        </IconButton>
                    </Tooltip>
                    {user && (
                        <Tooltip title={user.displayName} arrow>
                            <Avatar className='hover:-translate-y-1 duration-300' src={user.photoURL} alt={user.displayName} />
                        </Tooltip>
                    )}
                </Toolbar>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -20, scale: dropdown ? 1 : 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-16 w-1/4 shadow-lg transform-translate-x-1/2 ${
                        dropdown ? 'block' : 'hidden'
                    }`}
                >
                    {dropdown && <Dropdown />}
                </motion.div>
            </AppBar>
        </div>
    );
};

export default NavBar;
