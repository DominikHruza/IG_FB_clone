import React, { useState } from 'react';
import FormInput from '../Form_Input/FormInput';
interface LogInState {
  email: string;
  password: string;
}
const LogIn = (): JSX.Element => {
  const [state, setValue] = useState<LogInState>({
    email: '',
    password: '',
  });

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
          value={state.email}
          required
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          handleChange={setValue}
          value={state.password}
          required
        />
      </form>
    </div>
  );
};

export default LogIn;
