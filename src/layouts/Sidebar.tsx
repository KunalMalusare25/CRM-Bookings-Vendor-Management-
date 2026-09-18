import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiMapPin,
  FiSettings,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

    const bookings = useSelector((state: RootState) => state.bookings.items);
    // Booking calculations
    const totalBookings = bookings.length;

    const menuItems = [
      {
        label: "Overview",
        path: "/dashboard",
        icon: FiGrid,
        end: true,
      },
      {
        label: "Bookings",
        path: "/bookings",
        icon: FiCalendar,
      },
      ...(user?.role === "admin"
        ? [
            {
              label: "Vendors",
              path: "/vendors",
              icon: FiMapPin,
            },
          ]
        : []),
    ];

    return (
      <>
        {/* Mobile overlay */}
        {isOpen && (
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          />
        )}

        <aside
          className={`
        fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col
        overflow-hidden
        border-r border-slate-200 bg-[#c8d9f8]
        transition-transform duration-300
        lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-w-none lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          {/* Brand */}
          <div className="flex h-20 items-center justify-between border-b border-slate-500 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950">
                <div className="h-4 w-4 rotate-45 rounded-sm border-2 border-white" />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  SportsStiks
                </h1>

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-900">
                  Operations
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Workspace */}
          <div className="px-5 pt-7">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900">
              Workspace
            </p>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                    group flex items-center gap-3 rounded-xl
                    px-3 py-3 text-sm font-semibold transition-colors
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={19}
                          className={
                            isActive ? "text-indigo-600" : "text-slate-800"
                          }
                        />

                        <span>{item.label}</span>

                        {item.label === "Bookings" && (
                          <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                            {totalBookings}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Bottom-section */}
          <div className="mt-auto border-t border-slate-500 p-5">
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900">
              Management
            </p>
            <nav className="space-y-1">
              <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <FiSettings size={19} />
                Settings
              </NavLink>

              <NavLink
                to="/help"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900"
              >
                <FiHelpCircle size={19} />
                Help Center
              </NavLink>
            </nav>
          </div>
        </aside>
      </>
    );
};

export default Sidebar;