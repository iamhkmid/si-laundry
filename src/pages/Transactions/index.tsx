import React from "react";
import { TransactionContext } from "../../lib/TransactionProvider";
import { TransactionContextProps } from "../../lib/TransactionProvider/TransactionProvider.types";
import Button from "../../components/FormFields/Button";
import AddTransactionModal from "../../components/Modals/AddTransactionModal";
import moment from "moment";
import "moment/locale/id";
import cn from "../../lib/utils/cn";

type HeadRows = { key: string; label?: string; hidden?: boolean };

const headRows: HeadRows[] = [
  { key: "id", hidden: true },
  { key: "no", label: "No" },
  { key: "name", label: "Nama" },
  { key: "handphone", label: "No Handphone" },
  { key: "service", label: "Layanan" },
  { key: "package", label: "Paket" },
  { key: "amount", label: "Harga" },
  { key: "createdAt", label: "Tgl Transaksi" },
  { key: "status", hidden: true },
];

function createData(
  no: number,
  id: string,
  name: string,
  handphone: string,
  service: string,
  spackage: string,
  amount: string,
  createdAt: string,
  status: string,
) {
  return {
    no,
    id,
    name,
    handphone,
    service,
    package: spackage,
    amount,
    createdAt,
    status,
  };
}

const Transactions = () => {
  const [modalAdd, setModalAdd] = React.useState(false);
  const { state, dispatch } = React.useContext(
    TransactionContext,
  ) as TransactionContextProps;

  const bodyRows = React.useMemo(() => {
    return (
      state.transactions?.map((transaction, idx) => {
        return createData(
          idx + 1,
          transaction.id,
          transaction.name,
          transaction.phone,
          transaction.service,
          transaction.package,
          transaction.amount.toLocaleString("id"),
          moment(transaction.createdAt).format("DD/MM/YYYY HH:mm"),
          transaction.status,
        );
      }) || []
    );
  }, [state.transactions]);

  return (
    <div className="flex w-full flex-col">
      <AddTransactionModal onClose={() => setModalAdd(false)} open={modalAdd} />
      <div className="flex w-full flex-col rounded-[5px] bg-white p-[20px]">
        <div className="flex">
          <Button onClick={() => setModalAdd(true)}>Tambah</Button>
        </div>
        <table className="mt-[50px] w-full border-collapse">
          <thead>
            <tr>
              {headRows.map(
                (row) =>
                  !row.hidden && (
                    <th key={row.key} align="left">
                      {row.label}
                    </th>
                  ),
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!state.transactions.length &&
              bodyRows.map((bodyRow) => (
                <tr
                  key={bodyRow.id}
                  className="border-b-[1px] border-slate-400"
                >
                  {headRows.map(
                    (headRow) =>
                      !headRow.hidden && (
                        <td
                          key={headRow.key}
                          className="py-[20px] text-sm font-medium text-slate-600"
                        >
                          {
                            (bodyRow as { [key: string]: string | number })[
                              headRow.key
                            ]
                          }
                        </td>
                      ),
                  )}
                  <td align="left">
                    <div>
                      <Button
                        className={cn({
                          "bg-slate-500 hover:bg-slate-700":
                            bodyRow.status === "onProgress",
                          "bg-green-500 hover:bg-green-700":
                            bodyRow.status === "readyDeliver",
                        })}
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_STATUS",
                            value: { id: bodyRow.id },
                          })
                        }
                      >
                        {
                          state.status.find(
                            (item) => item.value === bodyRow.status,
                          )?.label
                        }
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!state.transactions.length && (
          <div className="flex min-h-[100px] w-full items-center justify-center">
            <p className="text-base font-medium text-slate-600">
              Belum ada transaksi
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
