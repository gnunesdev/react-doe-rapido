import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { current } from '@reduxjs/toolkit';

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

export const OnboardingStepsProvider = ({
  children,
}: OnboardingStepsProviderProps) => {
  /**
   * Set initial step to the first one in the contant Object
   */
  const [currentStep, setCurrentStep] = usePersistedState(
    'onboardingStep',
    STEPS.contact
  );

  const Onboardingsteps = Object.values(STEPS);
  const currentIndexStep = Onboardingsteps.findIndex(
    (step) => step === currentStep
  );

  function goToNextStep() {
    setCurrentStep(Onboardingsteps[currentIndexStep + 1]);
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
