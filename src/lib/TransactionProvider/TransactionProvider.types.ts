import { Unarray } from "../../types/global.types";

export type TransactionContextProps = {
  state: TransactionReducerState;
  dispatch: React.Dispatch<TransactionReducerAction>;
};

export type TransactionProviderProps = {
  children: React.ReactNode;
};

export type TransactionReducerState = {
  price: {
    perkg: number;
    perunit: number;
  };
  transactions: {
    id: string;
    name: string;
    phone: string;
    service: string;
    package: string;
    amount: number;
    createdAt: string;
    status: "onProgress" | "readyDeliver" | "delivered";
  }[];
  services: { value: string; label: string }[];
  packages: { value: string; label: string }[];
  status: { value: string; label: string }[];
};

export type TransactionReducerAction =
  | {
      type: "ADD_TRANSACTION";
      value: Unarray<TransactionReducerState["transactions"]>;
    }
  | {
      type: "UPDATE_STATUS";
      value: { id: string };
    };

export type TransactionReducer = (
  state: TransactionReducerState,
  action: TransactionReducerAction,
) => TransactionReducerState;
