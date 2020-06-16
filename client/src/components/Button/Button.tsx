import React, { FunctionComponent, ReactNode, EventHandler } from 'react';

interface Props {
  children: ReactNode;
  type?: any;
  onClick?: any;
}

const Button = ({ children, ...props }: Props) => {
  return (
    <button className='btn btn-primary sign-in' {...props}>
      {children}
    </button>
  );
};

export default Button;
