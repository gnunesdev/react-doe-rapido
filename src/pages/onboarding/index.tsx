import { NextPage } from 'next';

import { CompanyFirstForm } from './components/CompanyFirstForm';
import { CompanySecondForm } from './components/CompanySecondForm';
import { ConfirmContactForm } from './components/ConfirmContactForm';
import { ContactForm } from './components/ContactForm';
import { OnboardingContainer } from './styles';

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingContainer>
      {/* <ContactForm /> */}
      {/* <ConfirmContactForm /> */}
      {/* <CompanyFirstForm /> */}
      <CompanySecondForm />
    </OnboardingContainer>
  );
};

export default OnboardingPage;
