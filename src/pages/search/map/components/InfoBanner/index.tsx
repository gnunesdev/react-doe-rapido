import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaInfo, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useTheme } from 'styled-components';

import {
  BannerMobile,
  CloseButton,
  InfoBannerContainer,
  InfoBannerMobileButton,
  Overlay,
} from './styles';
import Modal from '~/components/Modal';
import { Text } from '~/components/Text';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';

export function InfoBanner() {
  const minWidth = useMinWidth();

  return minWidth(Breakpoint.small) ? <InfoBannerDesktop /> : <InfoBannerMobile />;
}

function InfoBannerDesktop() {
  const { foreground } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  function handleCloseButton() {
    setIsOpen(false);
  }

  return (
    isOpen && (
      <InfoBannerContainer>
        <div>
          <FaInfoCircle color={foreground.primary} size={32} />
          <Text
            color={foreground.primary}
            fontSize="1.6"
            description="Estamos apresentando apenas as instituições mais próximas com base na sua pesquisa!"
          />
        </div>
        <CloseButton onClick={handleCloseButton}>
          <FaTimes color={foreground.primary} size={18} />
        </CloseButton>
      </InfoBannerContainer>
    )
  );
}

function InfoBannerMobile() {
  const { foreground } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  function toggleModal() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <InfoBannerMobileButton onClick={toggleModal}>
          <FaInfo color={foreground.primary} size={32} />
        </InfoBannerMobileButton>
      ) : (
        <>
          <Modal>
            <Overlay
              onClick={toggleModal}
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BannerMobile
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                as={motion.div}
                initial={{ bottom: '-100px' }}
                animate={{ bottom: '20px' }}
                exit={{ bottom: '100px' }}
              >
                <CloseButton onClick={toggleModal}>
                  <FaTimes color={foreground.primary} size={18} />
                </CloseButton>
                <div>
                  <FaInfoCircle color={foreground.primary} size={42} />
                  <Text
                    color={foreground.primary}
                    fontSize="1.8"
                    description="Estamos apresentando apenas as instituições mais próximas com base na sua pesquisa!"
                  />
                </div>
              </BannerMobile>
            </Overlay>
          </Modal>
        </>
      )}
    </AnimatePresence>
  );
}
