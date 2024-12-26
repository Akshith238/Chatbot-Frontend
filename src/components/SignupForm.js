import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextField, Typography } from '@mui/material';
import { auth, fbProvider, googleProvider, ghProvider } from '../utils/firebase'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import ToggleButtonComponent from './ToggleButton';
import { Facebook } from '@mui/icons-material';

const SignupForm = ({ isSignUp, toggleForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleCreateUser = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
            })
            .catch((error) => {
                console.error("Sign-up error:", error.message);
            });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((data) => {
                console.log('Signed in with Google');
            })
            .catch((error) => alert(error.message));
    };

    const handleSignInWithFb = (e) => {
        e.preventDefault();
        signInWithPopup(auth, fbProvider)
            .then(() => {
                console.log('Signed in with Facebook');
            })
            .catch((error) => alert(error.message));
    };

    const handleSignInWithGh = (e) => {
        e.preventDefault();
        signInWithPopup(auth, ghProvider)
            .then(() => {
                console.log('Signed in with GitHub');
            })
            .catch((error) => alert(error.message));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen"
        >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                <Typography className="text-xl font-poppins font-bold mb-6">Sign Up</Typography>
                <form onSubmit={handleCreateUser} className="flex flex-col items-center space-y-4">
                    <TextField
                        fullWidth
                        variant="filled"
                        className='font-poppins'
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        className='font-poppins'
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        className='font-poppins'
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <motion.div initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ ease: "easeOut", duration: "0.2" }}
                    >
                        <Button type="submit" className='font-semibold font-poppins text-white rounded-2xl p-2 px-5 bg-gradient-to-r from-zinc-900 via-slate-900 to-neutral-900'>
                            Sign Up
                        </Button>
                    </motion.div>
                    <Typography className='font-poppins font-semibold'>Or Sign Up With:</Typography>
                    <div className='flex justify-center gap-4'>
                        <motion.div initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
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

export default SignupForm;
