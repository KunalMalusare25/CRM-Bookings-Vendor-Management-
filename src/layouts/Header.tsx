import { FiMenu, FiSearch, FiBell, FiSun, FiMoon } from "react-icons/fi";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { theme, toggleTheme } = useTheme();
  console.log("theme",theme)
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 backdrop-blur-sm transition-colors duration-200 sm:px-6 lg:px-8 ${isDark ? "border-slate-800 bg-slate-900/95" : "border-slate-200 bg-white/95"}`}
    >
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className={`rounded-xl p-2 transition ${isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-slate-100"}`}
          aria-label="Open navigation"
        >
          <FiMenu size={22} />
        </button>

        <div className="hidden min-w-0 sm:block">
          <h2
            className={`truncate text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
          >
            WORKSPACE
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Mobile search */}
        <button
          className={`rounded-xl p-2.5 transition md:hidden ${isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
          aria-label="Search"
        >
          <FiSearch size={19} />
        </button>
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className={`rounded-xl p-2.5 transition ${isDark ? "text-amber-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
        </button>
        {/* Notification */}
        <button
          className={`relative rounded-xl p-2.5 transition ${isDark ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
          aria-label="Notifications"
        >
          <FiBell size={19} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500 ring-2 ring-white" />
        </button>
        <div
          className={`h-8 w-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
        />
        {/* Profile */}
        <button
          className={`flex items-center gap-2 rounded-xl p-2 transition ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${isDark ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-700"}`}
          >
            {user?.name
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </div>
          <div className="hidden text-left sm:block">
            <p
              className={`max-w-28 truncate text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}
            >
              {user?.name}
            </p>
            <p
              className={`text-[11px] capitalize ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              {user?.role}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
