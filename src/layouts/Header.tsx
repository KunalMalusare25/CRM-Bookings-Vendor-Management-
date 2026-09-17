import {
  FiMenu,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/authSlice"

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

    const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <FiMenu size={22} />
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-xs font-medium text-slate-400">
            Workspace
          </p>

          <h2 className="truncate text-sm font-bold text-slate-900">
            SportsStiks Operations
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <FiSearch size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search bookings..."
            className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:w-52"
          />

          <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 lg:block">
            /
          </kbd>
        </div>

        {/* Mobile search */}
        <button
          className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Search"
        >
          <FiSearch size={19} />
        </button>

        {/* Notification */}
        <button
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <FiBell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-white" />
        </button>

        {/* logout  */}
        <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <FiLogOut size={18} />
          </button>

        <div className="h-8 w-px bg-slate-200" />

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
            {user?.name
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-28 truncate text-sm font-bold text-slate-800">
              {user?.name}
            </p>

            <p className="text-[11px] capitalize text-slate-400">
              {user?.role}
            </p>
          </div>

          <FiChevronDown
            size={15}
            className="hidden text-slate-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;