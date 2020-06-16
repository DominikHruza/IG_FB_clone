import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../Form_Input/FormInput';
import Button from '../Button/Button';
import { userRegister } from '../../actions/auth';

export interface SignInData {
  email: string;
  password: string;
  confirmPass: string;
  username: string;
}

interface Props {
  userRegister: Function;
}
const SignIn = ({ userRegister }: Props): JSX.Element => {
  const [formData, setValue] = useState<SignInData>({
    email: '',
    password: '',
    confirmPass: '',
    username: '',
  });

  const { email, password, confirmPass, username } = formData;
  const onSubmit = (event: Event) => {
    event.preventDefault();

    if (password !== confirmPass) {
      alert('Wrong pass');
    } else {
      userRegister(email, password, username);
    }
  };

  return (
    <div className='container'>
      <h2>I dont have an account</h2>
      <span>Sign Up with your email and password</span>
      <form action=''>
        <FormInput
          label='Username'
          name='username'
          type='text'
          handleChange={setValue}
          value={formData.username}
          required
        />
        <FormInput
          label='Email'
          name='email'
          type='email'
          handleChange={setValue}
          value={formData.email}
          required
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          handleChange={setValue}
          value={formData.password}
          required
        />
        <FormInput
          label='Confirm Password'
          name='confirmPass'
          type='password'
          handleChange={setValue}
          value={formData.confirmPass}
          required
        />
        <Button type='submit' onClick={userRegister}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default connect(null, { userRegister })(SignIn);
