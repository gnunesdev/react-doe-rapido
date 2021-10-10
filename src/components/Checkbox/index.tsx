import { CheckboxContainer } from './styles';

interface CheckboxProps {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  error?: string;
  size: 'big' | 'medium';
  value?: string;
}

export const Checkbox: React.VFC<CheckboxProps> = ({
  name,
  label,
  size,
  onChange,
  onBlur,
  value,
  error,
}) => {
  return (
    <CheckboxContainer size={size}>
      <label>
        {label}
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </label>

      {error && <span>{error}</span>}
    </CheckboxContainer>
  );
};
