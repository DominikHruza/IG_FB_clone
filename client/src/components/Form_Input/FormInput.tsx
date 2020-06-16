import React, { useState, FormEvent } from 'react';

import './FormInput_styles.scss';

interface InputProps {
  label?: string;
  value: string;
  name: string;
  type: string;
  handleChange: any;
  required: boolean;
}
export const FormInput: React.FunctionComponent<InputProps> = ({
  label,
  handleChange,
  ...props
}): JSX.Element => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target);
    handleChange((prevState: Object) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='container group'>
      <input className='form-input' onChange={onInputChange} {...props} />
      {label ? (
        <label
          className={`${props.value.length ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
