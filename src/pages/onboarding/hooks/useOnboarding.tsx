import { createContext, ReactNode, useState } from 'react';

import { STEPS } from './../constants';

interface StepsProviderProps {
  children: ReactNode;
}

interface StepsContextData {
  currentStep: string;
}

const StepsContext = createContext({} as StepsContextData);

export const StepsProvider = ({ children }: StepsProviderProps) => {
  const steps = Object.values((item: any) => item);

  const [currentStep, setCurrentStep] = useState(STEPS.contact);

  // function goToNextStep() {
  //   setCurrentStep();
  // }

  return (
    <StepsContext.Provider value={{ currentStep }}>
      {children}
    </StepsContext.Provider>
  );
};
