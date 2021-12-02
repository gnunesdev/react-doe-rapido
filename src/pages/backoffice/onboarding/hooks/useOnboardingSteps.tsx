import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { STEPS } from './../constants';

interface OnboardingStepsProviderProps {
  children: ReactNode;
}

interface OnboardingStepsContextData {
  currentStep: any;
  goToNextStep: VoidFunction;
  resetStep: VoidFunction;
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

  const resetStep = () => {
    setCurrentStep(STEPS.contact);
  };

  const goToNextStep = () => {
    setCurrentStep(onboardingSteps[currentIndexStep + 1]);
    router.push(`/backoffice/onboarding/${onboardingSteps[currentIndexStep + 1]}`);
  };

  return (
    <OnboardingStepsContext.Provider value={{ currentStep, goToNextStep, resetStep }}>
      {children}
    </OnboardingStepsContext.Provider>
  );
};

export const useOnboardingSteps = () => {
  const context = useContext(OnboardingStepsContext);

  return context;
};
