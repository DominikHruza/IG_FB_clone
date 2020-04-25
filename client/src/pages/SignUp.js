import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alerts';
import { signUp } from '../actions/auth';

const SignUp = ({ setAlert, signUp, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const { username, email, password, passwordRepeat } = formData;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setAlert('Passwords dont match', 'danger');
    } else {
      signUp({ username, email, password });
    }
  };

  // Check if user logged in
  if (isAuthenticated) {
    return <Redirect to='/feed' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => handleFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='username'
            value={username}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => handleInput(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='passwordRepeat'
            value={passwordRepeat}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, signUp })(SignUp);
