import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiMapPin,
  FiSettings,
  FiHelpCircle,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/auth/authSlice";
import { useTheme } from "../context/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const totalBookings = bookings.length;

  const menuItems = [
    ...(user?.role === "admin"
      ? [
          {
            label: "Overview",
            path: "/dashboard",
            icon: FiGrid,
            end: true,
          },
        ]
      : []),

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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw]
          flex-col overflow-hidden border-r
          transition-colors duration-200
          lg:sticky lg:top-0 lg:z-auto lg:h-screen
          lg:max-w-none lg:translate-x-0
          ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-zinc-800 bg-zinc-800"
          }
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div
          className={`
            flex h-20 items-center justify-between border-b px-6
            ${isDark ? "border-slate-800" : "border-slate-400"}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950">
              <div className="h-4 w-4 rotate-45 rounded-sm border-2 border-white" />
            </div>

            <div>
              <h1
                className={`text-lg font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-200"
                }`}
              >
                SportsStiks
              </h1>

              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  isDark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Operations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`rounded-lg p-2 lg:hidden ${
              isDark
                ? "text-slate-500 hover:bg-slate-800 hover:text-white"
                : "text-slate-400 hover:bg-slate-200"
            }`}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Workspace */}
        <div className="px-5 pt-7">
          <p
            className={`mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] ${
              isDark ? "text-slate-500" : "text-slate-200"
            }`}
          >
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
                        ? isDark
                          ? "bg-violet-500/15 text-violet-300"
                          : "bg-violet-50 text-violet-700"
                        : isDark
                          ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                          : "text-slate-300 hover:bg-white hover:text-slate-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? isDark
                              ? "text-violet-400"
                              : "text-violet-600"
                            : isDark
                              ? "text-slate-500"
                              : "text-slate-500"
                        }
                      />

                      <span>{item.label}</span>

                      {item.label === "Bookings" && (
                        <span
                          className={`ml-auto rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            isDark
                              ? "bg-slate-800 text-slate-400"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
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

        {/* Bottom */}
        <div
          className={`
            mt-auto border-t p-5
            ${isDark ? "border-slate-800" : "border-slate-400"}
          `}
        >
          <p
            className={`mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] ${
              isDark ? "text-slate-500" : "text-slate-200"
            }`}
          >
            Management
          </p>

          <nav className="space-y-1">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-3 py-3
                text-sm font-semibold transition-colors
                ${
                  isActive
                    ? isDark
                      ? "bg-violet-500/15 text-violet-300"
                      : "bg-violet-50 text-violet-700"
                    : isDark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      : "text-slate-300 hover:bg-white hover:text-slate-900"
                }
                `
              }
            >
              <FiSettings size={19} />
              Settings
            </NavLink>

            <NavLink
              to="/help-center"
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-3 py-3
                text-sm font-semibold transition-colors
                ${
                  isActive
                    ? isDark
                      ? "bg-violet-500/15 text-violet-300"
                      : "bg-violet-50 text-violet-700"
                    : isDark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      : "text-slate-300 hover:bg-white hover:text-slate-900"
                }
                `
              }
            >
              <FiHelpCircle size={19} />
              Help Center
            </NavLink>
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`
              mt-2 flex w-full cursor-pointer items-center gap-3
              rounded-xl px-3 py-2.5 text-sm font-semibold
              transition-colors
              ${
                isDark
                  ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                  : "text-slate-300 hover:bg-red-50 hover:text-red-600"
              }
            `}
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
