import { motion } from 'framer-motion';
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
  handleSelectNeedFilter: (needId: string, shouldSearch: boolean) => void;
  handleToggleFiltersModal: VoidFunction;
  handleSearchCompanys: VoidFunction;
}

export function FiltersModal({
  needsFilters,
  handleSelectNeedFilter,
  handleToggleFiltersModal,
  handleSearchCompanys,
}: FiltersModalProps) {
  const { foreground } = useTheme();

  function handleSearch() {
    handleToggleFiltersModal();
    handleSearchCompanys();
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
            <Title description="Necessidades" size="medium" color={foreground.primary} />
          </header>
          <section>
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
            <Button variant="primary" onClick={handleSearch} description="Pesquisar" />
          </section>
        </FiltersModalContainer>
      </Overlay>
    </Modal>
  );
}
