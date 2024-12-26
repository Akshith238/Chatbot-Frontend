import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Typography } from '@mui/material';
import { auth, fbProvider, googleProvider, ghProvider } from '../utils/firebase'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import ToggleButtonComponent from './ToggleButton';
import { Facebook } from '@mui/icons-material';

const SignInForm = ({ isSignUp, toggleForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider).then(() => {
        }).catch((error) => alert(error.message));
    };

    const handleSignInWithFb = (e) => {
        e.preventDefault();
        signInWithPopup(auth, fbProvider).then(() => {
            console.log('Success');
        })
            .catch((error) => alert(error.message));
    }

    const handleSignInWithGh = (e) => {
        e.preventDefault();
        signInWithPopup(auth, ghProvider).then(() => {
            console.log('Success');
        })
            .catch((error) => alert(error.message));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen"
        >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                <Typography className="text-xl font-poppins font-bold mb-6">Sign In</Typography>
                <form onSubmit={handleSubmit} className="flex font-poppins flex-col items-center space-y-4">
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <motion.div initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ ease: "easeOut", duration: "0.2" }}
                    >
                        <Button type="submit" className='font-semibold font-poppins text-white rounded-2xl p-2 px-5 bg-gradient-to-r from-zinc-900 via-slate-900 to-neutral-900'>
                            Sign In
                        </Button>
                    </motion.div>
                    <Typography className='font-semibold font-poppins'>Or Sign In With:</Typography>
                    <div className='flex justify-center gap-4'>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ ease: "easeOut", duration: "0.2" }}
                        >
                            <button
                                className="rounded-full"
                                onClick={handleSignInWithGoogle}
                            >
                                <img src={"Google Sign In.png"} alt="Google Sign In" className=" h-10 w-10" />
                            </button>
                        </motion.div>
                    </div>
                </form>
                <ToggleButtonComponent isSignUp={isSignUp} toggleForm={toggleForm} />
            </div>
        </motion.div>
    );
};

export default SignInForm;
