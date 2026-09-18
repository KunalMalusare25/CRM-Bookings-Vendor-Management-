import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={handleOpenSidebar} />

        <main
          className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 transition-colors duration-200 sm:p-6 lg:p-8 ${theme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
