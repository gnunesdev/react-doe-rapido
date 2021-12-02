import * as debounce from 'lodash.debounce';
import { useState, useCallback } from 'react';

import { FiltersContainer, FiltersSection, SliderContainer, SliderSection } from './styles';
import { Checkbox } from '~/components/Checkbox';
import { Slider } from '~/components/Slider';
import { Text } from '~/components/Text';
import { CompanyNeedsMap } from '~/constants';

interface FiltersProps {
  needsSelected: string[];
  handleSelectFilter: (needId: string, shouldSearch?: boolean) => void;
  handleChangeRange: (range: number, shouldSearch?: boolean) => void;
  range: number;
  maxRange: number;
}

export function Filters({
  needsSelected,
  handleSelectFilter,
  range,
  maxRange,
  handleChangeRange,
}: FiltersProps) {
  const [kilometers, setKilometers] = useState(range);
  const handleChangeRangeDebounced = useCallback(debounce(handleChangeRange, 250), [
    handleChangeRange,
  ]);
  function handleSliderChangeValue(range: number) {
    setKilometers(range);
    const res = range >= 100 ? 0 : range;
    handleChangeRangeDebounced(res, true);
  }
  function getRangeLabel() {
    return kilometers >= maxRange || kilometers === 0 ? 'Ilimitado' : `${kilometers} Km`;
  }
  return (
    <FiltersContainer>
      <Text description="Instituições que precisam de:" fontSize="1.8" isBold={true} />
      <FiltersSection>
        {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
          <Checkbox
            name={needValue}
            key={needId}
            label={needValue}
            size="medium"
            onChange={() => handleSelectFilter(needId)}
            checked={needsSelected.includes(needId)}
          />
        ))}
      </FiltersSection>
      <SliderSection>
        <Text description="Raio de busca:" fontSize="1.8" isBold={true} />
        <SliderContainer>
          <Slider
            handleChangeValue={handleSliderChangeValue}
            initialValue={kilometers || maxRange}
            max={maxRange}
          />
          <div className="value">{getRangeLabel()}</div>
        </SliderContainer>
      </SliderSection>
    </FiltersContainer>
  );
}
