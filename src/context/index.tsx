import React, { ReactNode, createContext, useContext, useState } from "react";

interface IDataProvider {
  children: ReactNode;
}

interface userReading {
  email: string;
  steps: string;
}

interface ProviderMethods {
  setContract: (contract: any) => void;
  getContract: () => any;
  setIsFirstAccess: (state: boolean) => void;
  getIsFirstAccess: () => boolean;
  setLastReading: (reading: userReading) => void;
  getLastReading: () => userReading | null;
  setGrantAccess: (state: boolean) => void;
  getGrantAccess: () => boolean;
}

const DataContext = createContext({} as ProviderMethods);

const DataProvider: React.FC<IDataProvider> = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const [lastReading, setLastReading] = useState<userReading | null>(null);
  const [grantAccess, setGrantAccess] = useState(false);

  const getContract = () => contract;

  const getIsFirstAccess = () => isFirstAccess;

  const getLastReading = () => lastReading;

  const getGrantAccess = () => grantAccess;

  const values: ProviderMethods = {
    setContract,
    getContract,
    setIsFirstAccess,
    getIsFirstAccess,
    setLastReading,
    getLastReading,
    getGrantAccess,
    setGrantAccess,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

const useDataProvider = () => useContext(DataContext);

export { DataProvider, useDataProvider };
