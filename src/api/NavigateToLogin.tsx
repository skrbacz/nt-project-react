import { createContext, useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const NavigateContext = createContext<NavigateFunction | null>(null);

export const NavigateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};

export const useNavigateContext = () => {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error('useNavigateContext must be used within a NavigateProvider');
  }
  return context;
};

export const NavigateToLogin = () => {
  const navigate = useNavigateContext();
  navigate('/login');
};
