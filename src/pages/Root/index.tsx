import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const RootPage = () => {
  return (
    <main className="box-border flex min-h-screen w-screen pl-[240px] pr-[20px] py-[40px]">
      <Sidebar />
      <div className="flex w-full">
        <Outlet />
      </div>
    </main>
  );
};
export default RootPage;
