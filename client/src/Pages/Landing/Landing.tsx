import React from 'react';
import { Link } from 'react-router-dom';

import './Landing_styles.scss';

const Landing = (): JSX.Element => {
  return (
    <header id='landing'>
      <div className='container landing-inner'>
        <div id='content'>
          <h1 className='header'>Insta Clone</h1>
          <p className='sub-header'>Show images to the world!</p>
          <div className='auth-links'>
            <Link to='/sign-in' className='btn btn-primary sign-in'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Landing;
