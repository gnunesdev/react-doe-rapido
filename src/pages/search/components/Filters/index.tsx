import { FiltersContainer, FiltersSection } from './styles';
import { Checkbox } from '~/components/Checkbox';
import { Text } from '~/components/Text';
import { CompanyNeedsMap } from '~/constants';

interface FiltersProps {
  needsSelected: string[];
  handleSelectFilter: (needId: string, shouldSearch?: boolean) => void;
}

export function Filters({ needsSelected, handleSelectFilter }: FiltersProps) {
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
    </FiltersContainer>
  );
}
