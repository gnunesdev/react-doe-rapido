import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { STEPS } from './../constants';
import usePersistedState from '~/hooks/usePersistedState';

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

  const [currentStep, setCurrentStep] = useState(router.query.step || STEPS.contact);

  const onboardingSteps = useMemo(() => Object.values(STEPS), []);
  const currentIndexStep = useMemo(
    () => onboardingSteps.findIndex((step) => step === currentStep),
    [currentStep]
  );

  const goToNextStep = () => {
    setCurrentStep(onboardingSteps[currentIndexStep + 1]);
    router.push(`/backoffice/onboarding/${onboardingSteps[currentIndexStep + 1]}`);
  };

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
