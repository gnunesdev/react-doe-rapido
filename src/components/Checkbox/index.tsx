import { CheckboxContainer } from './styles';

interface CheckboxProps {
  name: string;
  label?: string;
  onChange: any;
  onBlur?: any;
  error?: string;
  checked?: boolean;
  size: 'big' | 'medium';
  value?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  size,
  onChange,
  onBlur,
  value,
  error,
  children,
  checked = false,
}) => {
  console.log(Boolean(error));
  return (
    <CheckboxContainer size={size} hasError={Boolean(error)}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {children ? children : label}
      </label>
    </CheckboxContainer>
  );
};
