import { IconType } from 'react-icons/lib';
import { useTheme } from 'styled-components';

import { CardContainer } from './styles';
import { Button } from '~/components/Button';
import { ButtonLink } from '~/components/ButtonLink';

interface CardProps {
  variant: 'contact' | 'company' | 'delete';
  Icon: IconType;
  title: string;
  description: string;
  onClick?: VoidFunction;
}

export function Card({ variant, Icon, title, description, onClick }: CardProps) {
  const { colors } = useTheme();

  return (
    <CardContainer>
      <div className="icon">
        <Icon size={48} color={colors.primary} />
      </div>
      <div className="content">
        <h4>{title}</h4>
        <p>{description}</p>
        {variant === 'company' && (
          <ButtonLink
            variant="tertiary"
            description="Acessar página"
            href="/backoffice/edit-company"
          />
        )}
        {variant === 'contact' && (
          <ButtonLink
            variant="tertiary"
            description="Acessar página"
            href="/backoffice/edit-contact"
          />
        )}
        {variant === 'delete' && (
          <Button variant="tertiary" description="Excluir dados" onClick={onClick} />
        )}
      </div>
    </CardContainer>
  );
}
