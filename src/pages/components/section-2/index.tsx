import { Wrapper } from './styles';
import { ButtonLink } from '~/components/ButtonLink';

const Section2: React.VFC = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="title">Pesquisar locais para doação</div>
        <div className="text">
          Procure rapidamente pelas instituições que precisam de algum tipo de doação,
          visualize o local e entre em contato para agendar sua doação, tudo do jeito mais
          simples possível
        </div>
        <ButtonLink
          variant="tertiary"
          href="/search"
          description="Pesquisar"
          type="button"
        />
      </div>
    </Wrapper>
  );
};

export default Section2;
