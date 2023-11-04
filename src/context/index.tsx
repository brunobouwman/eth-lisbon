import React, { ReactNode, createContext, useContext, useState } from "react";

interface IDataProvider {
  children: ReactNode;
}

interface ProviderMethods {
  setContract: (contract: any) => void;
  getContract: () => any;
  setIsFirstAccess: (state: boolean) => void;
  getIsFirstAccess: () => boolean;
  setLastReading: (reading: string) => void;
  getLastReading: () => string | null;
}

const DataContext = createContext({} as ProviderMethods);

const DataProvider: React.FC<IDataProvider> = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const [lastReading, setLastReading] = useState<string | null>(null);

  const getContract = () => contract;

  const getIsFirstAccess = () => isFirstAccess;

  const getLastReading = () => lastReading;

  const values: ProviderMethods = {
    setContract,
    getContract,
    setIsFirstAccess,
    getIsFirstAccess,
    setLastReading,
    getLastReading,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

const useDataProvider = () => useContext(DataContext);

export { DataProvider, useDataProvider };
