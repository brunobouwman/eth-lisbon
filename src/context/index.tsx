import React, { ReactNode, createContext, useContext, useState } from "react";

interface IDataProvider {
  children: ReactNode;
}

interface ProviderMethods {
  setContract: (contract: any) => void;
  getContract: () => any;
  setIsFirstAccess: (state: boolean) => void;
  getIsFirstAccess: () => boolean;
}

const DataContext = createContext({} as ProviderMethods);

const DataProvider: React.FC<IDataProvider> = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [isFirstAccess, setIsFirstAccess] = useState(false);

  const getContract = () => contract;

  const getIsFirstAccess = () => isFirstAccess;

  const values: ProviderMethods = {
    setContract,
    getContract,
    setIsFirstAccess,
    getIsFirstAccess,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

const useDataProvider = () => useContext(DataContext);

export { DataProvider, useDataProvider };
