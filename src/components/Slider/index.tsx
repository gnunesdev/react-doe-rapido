import { useState } from 'react';

import { InputSlider } from './styles';

interface SliderProps {
  max: number;
  initialValue?: number;
  handleChangeValue: (value: number) => void;
}

export function Slider({ max, initialValue, handleChangeValue }: SliderProps) {
  const [value, setValue] = useState(initialValue || max);

  function handleChangeRange(e: React.ChangeEvent<HTMLInputElement>) {
    const range = +e.target.value;
    setValue(range);
    handleChangeValue(range >= 100 ? 0 : range);
  }

  return (
    <InputSlider onChange={handleChangeRange} type="range" value={value} min="1" max={max} />
  );
}
