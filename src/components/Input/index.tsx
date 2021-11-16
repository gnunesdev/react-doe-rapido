import { InputHTMLAttributes } from 'react';
import { FaPen } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import { EditInputButton, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onChange?: any;
  onBlur?: any;
  error?: string;
  inputSize: 'big' | 'medium';
  value?: string;
  mask?: string;
  handleChangeModalInput?: VoidFunction;
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
  handleChangeModalInput,
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
          disabled={Boolean(handleChangeModalInput)}
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
          disabled={Boolean(handleChangeModalInput)}
          {...props}
        />
      )}
      {Boolean(handleChangeModalInput) && (
        <EditInputButton type="button" onClick={handleChangeModalInput}>
          <FaPen color="#fff" size={16} />
        </EditInputButton>
      )}
      {error && <span>{error}</span>}
    </InputContainer>
  );
};
