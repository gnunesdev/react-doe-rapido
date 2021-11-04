import { useState, createContext, ReactNode, useContext } from 'react';

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarProviderContextData {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext({} as SidebarProviderContextData);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleCollapsed() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  return context;
};
