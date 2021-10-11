import { useEffect, useState } from 'react';

import Cookie from 'js-cookie';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Router from 'next/router';

import { CompanyFirstForm } from './components/CompanyFirstForm';
import { CompanySecondForm } from './components/CompanySecondForm';
import { ConfirmContactForm } from './components/ConfirmContactForm';
import { ContactForm } from './components/ContactForm';
import { STEPS } from './constants';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { OnboardingContainer } from './styles';

interface OnboardingPageProps {
  step: keyof typeof STEPS;
}

const OnboardingPage: NextPage<OnboardingPageProps> = ({ step }) => {
  const { currentStep } = useOnboardingSteps();
  const [stepToRender, setStepToRender] = useState(step);

  useEffect(() => {
    if (currentStep === STEPS.finished) {
      Router.push('/backoffice');
    }
    currentStep != stepToRender && setStepToRender(currentStep);
  }, [currentStep]);

  const cookiedStep = Cookie.get('onboardingStep');
  console.log('cookied', cookiedStep);

  return (
    <OnboardingContainer>
      {stepToRender === STEPS.contact && <ContactForm />}
      {stepToRender === STEPS.confirmContact && <ConfirmContactForm />}
      {stepToRender === STEPS.company1 && <CompanyFirstForm />}
      {stepToRender === STEPS.company2 && <CompanySecondForm />}
    </OnboardingContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(STEPS).map((step: string) => ({
    params: { step },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const currentStep = String(params?.step);

  if (!Object.values(STEPS).includes(currentStep)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // let validStep = currentStep;
  // const cookiedStep = Cookie.get('onboardingStep');

  // console.log('cookied', cookiedStep)

  // if (currentStep != cookiedStep && Object.values(STEPS).includes(cookiedStep)) {
  //   validStep = cookiedStep;
  // }

  return {
    props: {
      step: currentStep,
    },
  };
};

export default OnboardingPage;
