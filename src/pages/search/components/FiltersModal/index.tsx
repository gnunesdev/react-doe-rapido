import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import { fadeRight, overlayShow } from './animation';
import { FiltersModalContainer, Overlay } from './styles';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import Modal from '~/components/Modal';
import { Title } from '~/components/Title';
import { CompanyNeedsMap } from '~/constants';

interface FiltersModalProps {
  needsFilters: string[];
  range: number;
  handleSelectNeedFilter: (needId: string, shouldSearch: boolean) => void;
  handleToggleFiltersModal: VoidFunction;
  handleSearchCompanys: (description: undefined, needs: string[]) => void;
  handleSelectRange: (range: number) => void;
}

export function FiltersModal({
  needsFilters,
  range,
  handleSelectNeedFilter,
  handleToggleFiltersModal,
  handleSearchCompanys,
  handleSelectRange,
}: FiltersModalProps) {
  const { foreground, colors } = useTheme();
  const [kilometers, setKilometers] = useState(range || 100);

  function getRangeLabel() {
    return kilometers >= 100 || kilometers === 0 ? 'Ilimitado' : `${kilometers} Km`;
  }

  function handleSearch() {
    handleToggleFiltersModal();
    handleSearchCompanys(undefined, needsFilters);
  }

  function handleChangeRange(e: React.ChangeEvent<HTMLInputElement>) {
    const range = +e.target.value;
    setKilometers(range);
    handleSelectRange(range >= 100 ? 0 : range);
  }

  return (
    <Modal>
      <Overlay
        onClick={handleToggleFiltersModal}
        as={motion.div}
        variants={overlayShow}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <FiltersModalContainer
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          as={motion.div}
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <header>
            <Title description="Filtros" size="medium" color={foreground.primary} />
          </header>
          <section>
            <Title description="Necessidades" size="medium" color={colors.primary} />
            <div className="needs">
              {Object.entries(CompanyNeedsMap).map(([needId, needValue]) => (
                <Checkbox
                  name={needValue}
                  key={needId}
                  label={needValue}
                  size="big"
                  onChange={() => handleSelectNeedFilter(needId, false)}
                  checked={needsFilters.includes(needId)}
                />
              ))}
            </div>
          </section>
          <section>
            <Title description="Raio de busca" size="medium" color={colors.primary} />
            <div className="range">
              <input
                className="range__slider"
                onChange={handleChangeRange}
                type="range"
                value={kilometers}
                min="1"
                max="100"
                id="myRange"
              />
              <div className="range__value">{getRangeLabel()}</div>
            </div>
          </section>
          <section>
            <Button variant="primary" onClick={handleSearch} description="Pesquisar" />
          </section>
        </FiltersModalContainer>
      </Overlay>
    </Modal>
  );
}
