import { InputContainer } from './styles';

interface InputProps {
  name: string;
  label: string;
  onChange: any;
  size: 'big' | 'medium';
}

export const Input: React.VFC<InputProps> = ({
  name,
  label,
  size,
  onChange,
}) => {
  return (
    <InputContainer size={size}>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} onChange={onChange} />
    </InputContainer>
  );
};
