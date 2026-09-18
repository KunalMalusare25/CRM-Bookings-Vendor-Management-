import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Bookings from "../pages/Bookings/Bookings";
import Vendors from "../pages/Vendors/Vendors";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import Settings from "../pages/Setting/Settings";

import type { RootState } from "../store/store";

const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const isAdmin = user?.role === "admin";
  const isSupport = user?.role === "support";

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={isAdmin ? "/dashboard" : "/bookings"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        element={
          isAuthenticated ? (
            <Layout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* ADMIN ONLY */}
        {isAdmin && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        {/* ADMIN + SUPPORT */}
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-center" element={<HelpCenter />} />

        {/* ADMIN ONLY */}
        {isAdmin && (
          <Route path="/vendors" element={<Vendors />} />
        )}

        {/* SUPPORT trying to access dashboard */}
        {isSupport && (
          <Route
            path="/dashboard"
            element={<Navigate to="/bookings" replace />}
          />
        )}

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAdmin ? "/dashboard" : "/bookings"}
              replace
            />
          }
        />
      </Route>

      {/* GLOBAL FALLBACK */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? isAdmin
                  ? "/dashboard"
                  : "/bookings"
                : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;