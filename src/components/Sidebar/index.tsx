import { NavLink } from "react-router-dom";
import cn from "../../lib/utils/cn";

type linkClass = { isActive: boolean; isPending: boolean };

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 flex min-h-full w-fit min-w-[220px] flex-col items-center bg-white py-[20px]">
      <div>
        <h2 className="text-base font-bold text-slate-600">Sistem Informasi</h2>
        <h2 className="leading-none text-lg font-bold text-slate-600">Laundry</h2>
      </div>
      <ul className="mt-[100px] w-full">
        {menuData.map((menu) => (
          <li className="w-full p-[3px]" key={menu.path}>
            <NavLink
              className={(args: linkClass): string =>
                cn(
                  "flex w-full rounded-[5px] p-[10px_15px] font-semibold text-slate-600 transition-colors duration-200 ease-in-out hover:bg-blue-200 hover:text-slate-600",
                  {
                    "bg-blue-400 text-white hover:bg-blue-400 hover:text-white":
                      args.isActive,
                  },
                )
              }
              to={menu.path}
            >
              {menu.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

const menuData = [
  {
    label: "Transaksi",
    path: "/transaction",
  },
  {
    label: "Pengaturan",
    path: "/settings",
  },
];
