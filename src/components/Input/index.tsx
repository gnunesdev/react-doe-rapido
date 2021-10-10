import { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import { InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onChange: any;
  onBlur?: any;
  error?: string;
  inputSize: 'big' | 'medium';
  value?: string;
  mask?: string;
}

export const Input: React.VFC<InputProps> = ({
  name,
  label,
  inputSize,
  onChange,
  onBlur,
  value,
  error,
  mask,
  ...props
}) => {
  return (
    <InputContainer size={inputSize} hasError={Boolean(error)}>
      {label && <label htmlFor={name}>{label}</label>}
      {!mask ? (
        <input
          type="text"
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
        />
      ) : (
        <InputMask
          type="text"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          id={name}
          value={value}
          mask={mask}
          maxLength={3}
          {...props}
        />
      )}
      {error && <span>{error}</span>}
    </InputContainer>
  );
};
