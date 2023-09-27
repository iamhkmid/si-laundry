/* eslint-disable no-case-declarations */
import {
  TransactionReducer,
  TransactionReducerState,
} from "./TransactionProvider.types";

export const reducer: TransactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const price =
        (state.price as { [key: string]: number })[action.value.package] ?? 0;
      let addtionalPrice = 0;
      if (action.value.service === "1days")
        addtionalPrice = price + price * 0.25;
      if (action.value.service === "flash")
        addtionalPrice = price + price * 0.3;
      const amount = price + addtionalPrice;
      return {
        ...state,
        transactions: [...state.transactions, { ...action.value, amount }],
      };
    }
    case "UPDATE_STATUS": {
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction.id === action.value.id) {
            if (transaction.status === "onProgress")
              return { ...transaction, status: "readyDeliver" };
            if (transaction.status === "readyDeliver")
              return { ...transaction, status: "delivered" };
            return transaction;
          }
          return transaction;
        }),
      };
    }
    default:
      return state;
  }
};

export const initialState: TransactionReducerState = {
  transactions: [],
  price: {
    perkg: 10000,
    perunit: 15000,
  },
  services: [
    { value: "2days", label: "2 Hari" },
    { value: "1days", label: "1 Hari" },
    { value: "flash", label: "Kilat (10 Jam)" },
  ],
  packages: [
    { value: "perkg", label: "Kiloan" },
    { value: "perunit", label: "Satuan (Dry Cleaning)" },
  ],
  status: [
    { value: "onProgress", label: "On Progress" },
    { value: "readyDeliver", label: "Ready" },
    { value: "delivered", label: "Delivered" },
  ],
};
