import React, { createContext, useContext, useState, useCallback } from 'react';
import { Loader } from '../components/Loader';

type LoaderContextType = {
  incrementLoading: () => void;
  decrementLoading: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = useCallback(() => {
    setLoadingCount(prevCount => prevCount + 1);
  }, []);

  const decrementLoading = useCallback(() => {
    setLoadingCount(prevCount => prevCount - 1);
  }, []);

  return (
    <LoaderContext.Provider value={{ incrementLoading, decrementLoading }}>
      {loadingCount > 0 && <Loader message={undefined} />}
      {children}
    </LoaderContext.Provider>
  );
};
