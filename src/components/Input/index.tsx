import { InputContainer } from './styles';

interface InputProps {
  name: string;
  label: string;
  onChange: any;
  error?: string;
  size: 'big' | 'medium';
}

export const Input: React.VFC<InputProps> = ({
  name,
  label,
  size,
  onChange,
  error,
}) => {
  return (
    <InputContainer size={size} hasError={Boolean(error)}>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} onChange={onChange} />
      {error && <span>{error}</span>}
    </InputContainer>
  );
};
