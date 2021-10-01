import { Title } from '~/components/Title';

import { Container, Form } from './styles';

interface EditCompanyShellProps {}

export const EditCompanyShell: React.VFC<EditCompanyShellProps> = () => {
  return (
    <Container>
      <Title description="Editar instituição" size="big" />
      <Form></Form>
    </Container>
  );
};
