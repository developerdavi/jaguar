import React, { InputHTMLAttributes } from 'react';

import { InputContainer } from './styles';

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <InputContainer {...props} />;
};

export default Input;
