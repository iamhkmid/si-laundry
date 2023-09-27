import ToastProvider from "./lib/ToastProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/Root";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import TransactionProvider from "./lib/TransactionProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "transaction",
        element: <Transactions />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <ToastProvider>
      <TransactionProvider>
        <RouterProvider router={router} />
      </TransactionProvider>
    </ToastProvider>
  );
}

export default App;
