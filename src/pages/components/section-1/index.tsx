import { Wrapper } from './styles';

const Section1: React.FC = () => {
  return (
    <Wrapper>
      <div className="container">
        <img className="image" src="/gift.svg" />
        <div className="info">
          <div className="title">
            doe.rápido, o aplicativo que ajuda você a ajudar alguém!
          </div>
          <div className="text">
            com o doe.rápido, você encontra lugares próximos que precisam de doações, rápido
            e fácil, sem enrolação e direto ao ponto.
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Section1;
