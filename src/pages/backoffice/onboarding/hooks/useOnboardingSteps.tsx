import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useMemo } from 'react';

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
  const [currentStep, setCurrentStep] = usePersistedState('onboardingStep', STEPS.contact);

  const OnboardingSteps = useMemo(() => Object.values(STEPS), []);
  const currentIndexStep = useMemo(
    () => OnboardingSteps.findIndex((step) => step === currentStep),
    [currentStep]
  );

  const goToNextStep = () => {
    setCurrentStep(OnboardingSteps[currentIndexStep + 1]);
    router.push(`/backoffice/onboarding/${OnboardingSteps[currentIndexStep + 1]}`);
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
