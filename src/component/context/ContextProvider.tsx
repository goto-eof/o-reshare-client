import React, { createContext } from 'react';
import { PropsWithChildren, useState } from 'react';

export interface AppState {
  selectedMenu: string;
  updateState: (newState: Partial<AppState>) => void;
}

const defaultState: AppState = {
  selectedMenu: '/',
  updateState: (newState?: Partial<AppState>) => {},
};

/**
 * Creating the Application state context for the provider
 */
export const ApplicationContext = React.createContext<AppState>(defaultState);

export const ApplicationContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const [state, setState] = useState<any>({ selectedMenu: '/' });
  const updateState = (newState: Partial<AppState>) => {
    setState({ ...state, ...newState });
  };
  return (
    <ApplicationContext.Provider value={{ ...state, updateState }}>
      {children}
    </ApplicationContext.Provider>
  );
};
