import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Bookings from "../pages/Bookings/Bookings";
import Vendors from "../pages/Vendors/Vendors";

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Routes>
      {/* LOGIN AUTH IF NOT THEN GOES TO LOGIN AGAIN ELSE DASHBOARD  */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      {/*----------------PROTECTED ROUTES--------------------------------  */}
      <Route
        element={
          isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/vendors" element={<Vendors />} />
      </Route>
      {/* ---------------------------------------------------------------- */}

      {/* FALLBACK ROUTES  */}
      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
