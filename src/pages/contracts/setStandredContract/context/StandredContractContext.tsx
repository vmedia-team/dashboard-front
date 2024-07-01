import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

// * create context
export const StandredContractContext =
  createContext<StandredContractContextType>({});

export function StandredContractContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables

  // TODO::declare and define our helper methods

  return (
    <StandredContractContext.Provider value={{}}>
      {children}
    </StandredContractContext.Provider>
  );
}

// * declare and define needed types
type PropsType = {
  children: React.ReactNode;
};

type StandredContractContextType = {};
