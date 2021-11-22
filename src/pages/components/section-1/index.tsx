import { Wrapper } from './styles';

const Section1: React.VFC = () => {
  return (
    <Wrapper>
      <div className="container">
        <img className="image" src="/gift.svg" />
        <div className="info">
          <div className="title">doe.rápido, o sistema que ajuda você a ajudar alguém!</div>
          <div className="text">
            Com o doe.rápido, você encontra lugares próximos que precisam de doações, de
            forma rápida e fácil, sem enrolação e direto ao ponto.
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Section1;
