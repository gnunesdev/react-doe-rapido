import { FaLongArrowAltDown } from 'react-icons/fa';

import Step from './components/step';
import { Wrapper } from './styles';
import { ButtonLink } from '~/components/ButtonLink';
import { useMinWidth } from '~/hooks/useMinWidth';
import { Breakpoint } from '~/styles/variables';

const Section3: React.VFC = () => {
  const minWidth = useMinWidth();
  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <img src="/register.svg" alt="" className="header__image" />
          <div className="header__info">
            <div className="header__title">Cadastre sua instituição</div>
            <div className="header__text">
              Se cadastre na nossa plataforma exclusiva e apareça para diversos doadores que
              podem ajudar nas necessidades da sua instituição.
            </div>
          </div>
        </div>
        <div className="steps">
          <Step index={0} size={minWidth(Breakpoint.medium) ? 200 : 140}>
            Faça login na plataforma
          </Step>
          <div className="steps__arrow">
            <FaLongArrowAltDown size={minWidth(Breakpoint.medium) ? 90 : 50} />
          </div>
          <Step index={1} size={minWidth(Breakpoint.medium) ? 200 : 140}>
            Cadastre sua instituição
          </Step>
          <div className="steps__arrow">
            <FaLongArrowAltDown size={minWidth(Breakpoint.medium) ? 90 : 50} />
          </div>
          <Step index={2} size={minWidth(Breakpoint.medium) ? 200 : 140}>
            Receba doações
          </Step>
        </div>
        <ButtonLink
          variant="primary"
          description="Cadastre-se agora"
          href="/login"
          width={minWidth(Breakpoint.medium) ? 480 : 220}
        />
      </div>
    </Wrapper>
  );
};

export default Section3;
