import jwtDecode from 'jwt-decode';
import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import { CompanyFirstForm } from './components/CompanyFirstForm';
import { CompanySecondForm } from './components/CompanySecondForm';
import { ConfirmContactForm } from './components/ConfirmContactForm';
import { ContactForm } from './components/ContactForm';
import { STEPS } from './constants';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { OnboardingContainer } from './styles';
import { Header } from '~/components/Header';
import { destroyCookies, JwtTokenResponse } from '~/context/useAuth';
import { setupAuthorizedApi } from '~/services/api';

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
    <>
      <Header />
      <OnboardingContainer>
        {step === STEPS.contact && <ContactForm />}
        {step === STEPS.confirmContact && <ConfirmContactForm />}
        {step === STEPS.company1 && <CompanyFirstForm />}
        {step === STEPS.company2 && <CompanySecondForm />}
      </OnboardingContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { 'doerapido.token': token } = parseCookies(context);

  const api = setupAuthorizedApi(context);

  const currentStep = params?.step ? String(params?.step) : false;

  if (currentStep && !Object.values(STEPS).includes(currentStep)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!token && currentStep !== STEPS.contact && currentStep !== STEPS.confirmContact) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (token) {
    const data: JwtTokenResponse = jwtDecode(token);
    try {
      const dataUser = await api.get(`/user/${data.id}`);

      if (dataUser.data.stepOnboarding === STEPS.finished) {
        return {
          redirect: {
            destination: `/backoffice?cameFromOnboarding=true`,
            permanent: false,
          },
        };
      }

      if (currentStep && currentStep !== dataUser.data.stepOnboarding) {
        return {
          redirect: {
            destination: `/backoffice/onboarding/${dataUser.data.stepOnboarding}`,
            permanent: false,
          },
        };
      }
    } catch (error) {
      destroyCookies(context);
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

  if (currentStep === 'finished') {
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
