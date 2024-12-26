import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged} from 'firebase/auth';
import Home from './Home';
import Loader from './Loader';
import { motion} from 'framer-motion';
import AnimatedBlob from './BlobAnimation';
import SignInForm from './SignInForm';
import SignupForm from './SignupForm';

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName);
        setUser({...user});
      } else {
        setUser(null);
        setLoading(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  if (user) {
    return <Home />;
  }

  return (
    <div className='flex flex-col overflow-auto bg-slate-950 h-fit bg-gradient-to-r'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='flex flex-col'>
          <div className='flex justify-evenly p-4'>
            <AnimatedBlob />
              {isSignUp ? (
                <motion.div
                  key='signup-form'
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <SignupForm isSignUp={isSignUp} toggleForm={toggleForm}/>
                </motion.div>
              ) : (
                <motion.div
                  key='signin-form'
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <SignInForm isSignUp={isSignUp} toggleForm={toggleForm}/>
                </motion.div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
