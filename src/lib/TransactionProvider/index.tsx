import React from "react";
import {
  TransactionContextProps,
  TransactionProviderProps,
} from "./TransactionProvider.types";
import { initialState, reducer } from "./TransactionReducer";

export const TransactionContext =
  React.createContext<TransactionContextProps | null>(null);

const TransactionProvider: React.FC<TransactionProviderProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value: TransactionContextProps = React.useMemo(
    () => ({ state, dispatch }),
    [state, dispatch],
  );

  return (
    <TransactionContext.Provider value={value}>
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
