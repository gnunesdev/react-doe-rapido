import { SelectContainer } from './styles';

interface SelectProps {
  label: string;
  name: string;
  value: string;
  setValue: (field: string, value: string) => void;
  options: [
    {
      value: string;
      description: string;
    }
  ];
  size: 'big' | 'medium';
  error: string;
}

export const Select: React.VFC<SelectProps> = ({
  name,
  label,
  value,
  setValue,
  options,
  size,
  error,
}) => {
  return (
    <SelectContainer size={size} hasError={Boolean(error)}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={(event) => setValue(name, event.target.value)}
      >
        <option>Selecione um estado:</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </SelectContainer>
  );
};
