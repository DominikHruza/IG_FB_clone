import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../Form_Input/FormInput';
import Button from '../Button/Button';
import { userLogin } from '../../actions/auth';
import AlertBox from '../Alert_box/AlertBox';
import { StoreState } from '../../reducers';
import { AuthState } from '../../reducers/auth';
import { Redirect } from 'react-router-dom';

export interface LogInData {
  email: string;
  password: string;
}

interface LoginProps {
  userLogin: Function;
  auth: AuthState;
}
const LogIn = ({
  auth: { isAuthenticated },
  userLogin,
}: LoginProps): JSX.Element => {
  const [formData, setValue] = useState<LogInData>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onSubmit = (event: Event) => {
    event.preventDefault();
    userLogin(formData);
  };

  if (isAuthenticated) {
    return <Redirect to='/feed' />;
  }

  return (
    <div className='log-in container'>
      <h2>I already have an account</h2>
      <span>Log in with your email and password</span>
      <form action=''>
        <FormInput
          label='Email'
          name='email'
          type='email'
          handleChange={setValue}
          value={email}
          required
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          handleChange={setValue}
          value={password}
          required
        />
      </form>
      <Button type='submit' onClick={onSubmit}>
        Log In
      </Button>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState) => {
  return {
    auth,
  };
};
export default connect(mapStateToProps, { userLogin })(LogIn);
