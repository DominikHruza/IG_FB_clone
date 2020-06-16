import React from 'react';
import LogIn from '../../components/LogIn/Login';
import SignIn from '../../components/SignIn/SignIn';

export const Auth = () => {
  return (
    <div className='row'>
      <div className='col'>
        <LogIn />
      </div>
      <div className='col'>
        <SignIn />
      </div>
    </div>
  );
};

export default Auth;
