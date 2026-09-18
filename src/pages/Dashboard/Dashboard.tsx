import {
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiArrowUpRight,
  FiMoreHorizontal,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTheme } from "../../context/ThemeContext";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const vendors = useSelector((state: RootState) => state.vendors.items);

  const { theme } = useTheme();

  const isDark = theme === "dark";

  // Booking calculations
  const totalBookings = bookings.length;

  const activeVendors = vendors.filter(
    (vendor) => vendor.status === "Active",
  ).length;

  const totalRevenue = bookings.reduce(
    (total, booking) => total + Number(booking.amount || 0),
    0,
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled",
  ).length;

  const getPercentage = (count: number) => {
    if (totalBookings === 0) return 0;

    return Math.round((count / totalBookings) * 100);
  };

  const confirmedPercentage = getPercentage(confirmedBookings);
  const pendingPercentage = getPercentage(pendingBookings);
  const cancelledPercentage = getPercentage(cancelledBookings);

  // Recent bookings
  const recentBookings = [...bookings]
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.slot}`).getTime();
      const dateB = new Date(`${b.date}T${b.slot}`).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  // Dashboard stats
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings.toLocaleString(),
      change: "",
      description: "All bookings",
      icon: FiCalendar,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      change: "",
      description: "Total booking revenue",
      icon: FiDollarSign,
    },
    {
      title: "Active Vendors",
      value: activeVendors.toLocaleString(),
      change: "",
      description: "Currently active",
      icon: FiMapPin,
    },
  ];

  // Page date
  const today = new Date();

  const formattedToday = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Chart
  const confirmedDegree = confirmedPercentage * 3.6;
  const pendingDegree = confirmedDegree + pendingPercentage * 3.6;

  const donutBackground =
    totalBookings === 0
      ? isDark
        ? "#334155"
        : "#e2e8f0"
      : `conic-gradient(
          #8b5cf6 0deg ${confirmedDegree}deg,
          #f59e0b ${confirmedDegree}deg ${pendingDegree}deg,
          ${isDark ? "#334155" : "#e2e8f0"} ${pendingDegree}deg 360deg
        )`;

  // EXPORT EXCEL
  const handleExportReport = () => {
    // Bookings sheet
    const bookingData = bookings.map((booking) => ({
      "Booking ID": booking.id,
      "User Name": booking.userName,
      "User Email": booking.userEmail,
      "User Phone": booking.userPhone,
      "Venue Name": booking.venueName,
      "Venue Address": booking.venueAddress,
      City: booking.city,
      Sport: booking.sport,
      Date: booking.date,
      "Time Slot": booking.slot,
      Amount: Number(booking.amount),
      Status: booking.status,
    }));

    // Vendors sheet
    const vendorData = vendors.map((vendor) => ({
      "Vendor ID": vendor.id,
      "Vendor Name": vendor.vendorName,
      City: vendor.city,
      Status: vendor.status,
    }));

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Create sheets
    const bookingsSheet = XLSX.utils.json_to_sheet(bookingData);
    const vendorsSheet = XLSX.utils.json_to_sheet(vendorData);

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, bookingsSheet, "Bookings");
    XLSX.utils.book_append_sheet(workbook, vendorsSheet, "Vendors");

    // Download Excel file
    XLSX.writeFile(
      workbook,
      `Sportstik_Report_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {formattedToday}
          </p>

          <h1
            className={`mt-1 text-2xl font-bold tracking-tight sm:text-3xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Good evening, {user?.name?.split(" ")[0] || "there"}.
          </h1>

          <p
            className={`mt-2 text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Here's what's happening with your bookings today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            onClick={handleExportReport}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`rounded-2xl border p-5 shadow-sm transition-colors duration-200 ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isDark
                      ? "bg-violet-500/15 text-violet-400"
                      : "bg-violet-50 text-violet-600"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <button
                  type="button"
                  className={`rounded-lg p-1.5 transition ${
                    isDark
                      ? "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                      : "text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <FiMoreHorizontal size={18} />
                </button>
              </div>

              <p
                className={`mt-5 text-sm font-medium ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {stat.title}
              </p>

              <div className="mt-1 flex flex-wrap items-end gap-3">
                <h2
                  className={`text-2xl font-bold tracking-tight ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </h2>

                {stat.change && (
                  <span className="mb-1 flex items-center gap-1 text-xs font-bold text-emerald-500">
                    <FiArrowUpRight size={14} />
                    {stat.change}
                  </span>
                )}
              </div>

              <p
                className={`mt-1 text-xs ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and overview */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        {/* Booking activity */}
        <div
          className={`rounded-2xl border p-5 shadow-sm transition-colors duration-200 sm:p-6 ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2
                className={`text-base font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Booking activity
              </h2>

              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Booking volume overview
              </p>
            </div>

            <select
              defaultValue="7"
              className={`rounded-lg border px-2 py-2 text-xs font-semibold outline-none ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-400"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>

          {/* Booking visualization */}
          <div className="mt-8 flex h-48 items-end gap-2 sm:gap-4">
            {[
              { day: "Mon", value: 45 },
              { day: "Tue", value: 65 },
              { day: "Wed", value: 52 },
              { day: "Thu", value: 80 },
              { day: "Fri", value: 68 },
              { day: "Sat", value: 94 },
              { day: "Sun", value: 72 },
            ].map((item) => (
              <div
                key={item.day}
                className="flex min-w-0 flex-1 flex-col items-center gap-3"
              >
                <div
                  className={`flex h-40 w-full items-end justify-center rounded-lg ${
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-violet-500 transition-all hover:bg-violet-600"
                    style={{
                      height: `${item.value}%`,
                    }}
                  />
                </div>

                <span
                  className={`text-xs font-medium ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking status */}
        <div
          className={`rounded-2xl border p-5 shadow-sm transition-colors duration-200 sm:p-6 ${
            isDark
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <h2
            className={`text-base font-bold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Booking status
          </h2>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Current booking distribution
          </p>

          {/* Donut */}
          <div className="mt-7 flex items-center justify-center">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: donutBackground,
              }}
            >
              <div
                className={`flex h-32 w-32 flex-col items-center justify-center rounded-full ${
                  isDark ? "bg-slate-900" : "bg-white"
                }`}
              >
                <span
                  className={`text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {totalBookings.toLocaleString()}
                </span>

                <span
                  className={`text-xs ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Total bookings
                </span>
              </div>
            </div>
          </div>

          {/* Status percentages */}
          <div className="mt-7 space-y-4">
            {/* Confirmed */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />

                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  Confirmed
                </span>
              </div>

              <span
                className={`font-bold ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {confirmedPercentage}%
              </span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />

                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  Pending
                </span>
              </div>

              <span
                className={`font-bold ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {pendingPercentage}%
              </span>
            </div>

            {/* Cancelled */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isDark ? "bg-slate-600" : "bg-slate-300"
                  }`}
                />

                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  Cancelled
                </span>
              </div>

              <span
                className={`font-bold ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {cancelledPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div
        className={`overflow-hidden rounded-2xl border shadow-sm transition-colors duration-200 ${
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div
          className={`flex flex-col justify-between gap-3 border-b p-5 sm:flex-row sm:items-center sm:p-6 ${
            isDark ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <div>
            <h2
              className={`text-base font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Recent bookings
            </h2>

            <p
              className={`mt-1 text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Latest bookings across all venues
            </p>
          </div>

          <Link
            to="/bookings"
            className={`text-sm font-bold transition ${
              isDark
                ? "text-violet-400 hover:text-violet-300"
                : "text-violet-600 hover:text-violet-700"
            }`}
          >
            View all bookings →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left">
            <thead className={isDark ? "bg-slate-800/60" : "bg-slate-50"}>
              <tr
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Sport</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark ? "divide-slate-800" : "divide-slate-100"
              }`}
            >
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className={`text-sm transition-colors ${
                      isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Booking ID */}
                    <td
                      className={`px-6 py-4 font-bold ${
                        isDark ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      {booking.id}
                    </td>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isDark
                              ? "bg-violet-500/15 text-violet-400"
                              : "bg-violet-50 text-violet-600"
                          }`}
                        >
                          {booking.userName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p
                            className={`whitespace-nowrap font-medium ${
                              isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {booking.userName}
                          </p>

                          <p
                            className={`text-xs ${
                              isDark ? "text-slate-500" : "text-slate-400"
                            }`}
                          >
                            {booking.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Venue */}
                    <td
                      className={`whitespace-nowrap px-6 py-4 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {booking.venueName}
                    </td>

                    {/* Sport */}
                    <td
                      className={`px-6 py-4 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {booking.sport}
                    </td>

                    {/* Date */}
                    <td
                      className={`whitespace-nowrap px-6 py-4 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {new Date(booking.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Amount */}
                    <td
                      className={`px-6 py-4 font-semibold ${
                        isDark ? "text-slate-200" : "text-slate-800"
                      }`}
                    >
                      ₹{Number(booking.amount).toLocaleString("en-IN")}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                          booking.status === "Confirmed"
                            ? isDark
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-emerald-50 text-emerald-700"
                            : booking.status === "Pending"
                              ? isDark
                                ? "bg-amber-500/15 text-amber-400"
                                : "bg-amber-50 text-amber-700"
                              : isDark
                                ? "bg-red-500/15 text-red-400"
                                : "bg-red-50 text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          isDark
                            ? "bg-slate-800 text-slate-500"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <FiCalendar size={22} />
                      </div>

                      <p
                        className={`mt-3 text-sm font-semibold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        No bookings found
                      </p>

                      <p
                        className={`mt-1 text-xs ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Recent bookings will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
