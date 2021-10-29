import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

import { CompanyFirstForm } from './components/CompanyFirstForm';
import { CompanySecondForm } from './components/CompanySecondForm';
import { ConfirmContactForm } from './components/ConfirmContactForm';
import { ContactForm } from './components/ContactForm';
import { STEPS } from './constants';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { OnboardingContainer } from './styles';
import { getCookies } from '~/utils';

interface OnboardingPageProps {
  step: keyof typeof STEPS;
}

const OnboardingPage: NextPage<OnboardingPageProps> = ({ step }) => {
  const { currentStep } = useOnboardingSteps();
  const [stepToRender, setStepToRender] = useState(step);

  useEffect(() => {
    currentStep != stepToRender && setStepToRender(currentStep);
  }, [currentStep, stepToRender]);

  return (
    <OnboardingContainer>
      {step === STEPS.contact && <ContactForm />}
      {step === STEPS.confirmContact && <ConfirmContactForm />}
      {step === STEPS.company1 && <CompanyFirstForm />}
      {step === STEPS.company2 && <CompanySecondForm />}
    </OnboardingContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const currentStep = String(params?.step);

  if (!Object.values(STEPS).includes(currentStep)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const cookies = getCookies(req);
  const realStep = cookies?.onboardingStep ? JSON.parse(cookies.onboardingStep) : '';

  if (realStep && currentStep != realStep && Object.values(STEPS).includes(realStep)) {
    return {
      redirect: {
        destination: `/backoffice/onboarding/${realStep}`,
        permanent: false,
      },
    };
  }

  if (realStep === STEPS.finished) {
    return {
      redirect: {
        destination: `/backoffice?cameFromOnboarding=true`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      step: currentStep,
    },
  };
};

export default OnboardingPage;
