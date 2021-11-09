import { FaSignInAlt, FaUserPlus, FaHandHoldingHeart } from 'react-icons/fa';

import { StepContainer, Icon, StepDescription } from './styles';

export interface StepProps {
  index: 0 | 1 | 2;
  size: number;
}

const Step: React.FC<StepProps> = ({ index, size, children }) => {
  return (
    <StepContainer>
      <Icon size={size}>
        {index === 0 && <FaSignInAlt size={size * 0.5} />}
        {index === 1 && <FaUserPlus size={size * 0.5} />}
        {index === 2 && <FaHandHoldingHeart size={size * 0.5} />}
      </Icon>
      <StepDescription>{children}</StepDescription>
    </StepContainer>
  );
};

export default Step;
