import { GetServerSideProps, NextPage } from 'next';

import { Header } from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

import { OnboardingStepsProvider } from './onboarding/hooks/useOnboardingSteps';

const BackofficePage: NextPage = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default BackofficePage;
