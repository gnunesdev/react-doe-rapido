import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import usePersistedState from '~/hooks/usePersistedState';

import { STEPS } from './../constants';

interface OnboardingStepsProviderProps {
  children: ReactNode;
}

interface OnboardingStepsContextData {
  currentStep: any;
  goToNextStep: VoidFunction;
}

const OnboardingStepsContext = createContext({} as OnboardingStepsContextData);

export const OnboardingStepsProvider = ({ children }: OnboardingStepsProviderProps) => {
  const router = useRouter();

  /**
   * Set initial step to the first one in the contant Object
   */
  const [currentStep, setCurrentStep] = usePersistedState('onboardingStep', STEPS.contact);

  const OnboardingSteps = Object.values(STEPS);
  const currentIndexStep = OnboardingSteps.findIndex((step) => step === currentStep);

  function goToNextStep() {
    setCurrentStep(OnboardingSteps[currentIndexStep + 1]);
    router.push(`/backoffice/onboarding/${OnboardingSteps[currentIndexStep + 1]}`);
  }

  return (
    <OnboardingStepsContext.Provider value={{ currentStep, goToNextStep }}>
      {children}
    </OnboardingStepsContext.Provider>
  );
};

export const useOnboardingSteps = () => {
  const context = useContext(OnboardingStepsContext);

  return context;
};
