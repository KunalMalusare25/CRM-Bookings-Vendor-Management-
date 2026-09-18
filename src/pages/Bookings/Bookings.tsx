import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiClock, FiFilter, FiSearch } from "react-icons/fi";

import type { RootState, AppDispatch } from "../../store/store";

import {
  addBooking,
  updateBookingStatus,
} from "../../store/bookings/bookingSlice";

import type { Booking, BookingStatus, Sport } from "../../data/bookings";

import CustomTable, {
  type TableColumn,
} from "../../components/common/CustomTable";

import {
  formatDate,
  formatAmount,
  bookingStatusOptions,
  sportOptions,
} from "../../utils";

import BookingDetailsDrawer from "../../components/bookings/Drawer";
import AddBookingModal from "../../components/bookings/AddBookingModal";

import { useTheme } from "../../context/ThemeContext";

const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bookings = useSelector((state: RootState) => state.bookings.items);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === "admin";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | BookingStatus>(
    "All",
  );
  const [sportFilter, setSportFilter] = useState<"All" | Sport>("All");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null,
  );
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);

  // Status Styles
  const getStatusClass = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed":
        return isDark
          ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20"
          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "Pending":
        return isDark
          ? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20"
          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

      case "Cancelled":
        return isDark
          ? "bg-red-400/10 text-red-400 ring-1 ring-red-400/20"
          : "bg-red-50 text-red-700 ring-1 ring-red-200";

      default:
        return isDark
          ? "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
          : "bg-slate-50 text-slate-600 ring-1 ring-slate-200";
    }
  };

  // Sport Styles
  const getSportClass = (sport: Sport) => {
    switch (sport) {
      case "Football":
        return isDark ? "bg-sky-400/10 text-sky-400" : "bg-sky-50 text-sky-700";

      case "Cricket":
        return isDark
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-emerald-50 text-emerald-700";

      case "Badminton":
        return isDark
          ? "bg-violet-400/10 text-violet-400"
          : "bg-violet-50 text-violet-700";

      case "Tennis":
        return isDark
          ? "bg-orange-400/10 text-orange-400"
          : "bg-orange-50 text-orange-700";

      default:
        return isDark
          ? "bg-slate-800 text-slate-400"
          : "bg-slate-50 text-slate-600";
    }
  };

  // Search + Filter + Sort
  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const result = bookings.filter((booking) => {
      const matchesSearch =
        searchValue === "" ||
        booking.id.toLowerCase().includes(searchValue) ||
        booking.userName.toLowerCase().includes(searchValue) ||
        booking.userEmail.toLowerCase().includes(searchValue) ||
        booking.venueName.toLowerCase().includes(searchValue) ||
        booking.city.toLowerCase().includes(searchValue) ||
        booking.sport.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;

      const matchesSport =
        sportFilter === "All" || booking.sport === sportFilter;

      return matchesSearch && matchesStatus && matchesSport;
    });

    if (sortDirection) {
      return [...result].sort((a, b) =>
        sortDirection === "asc"
          ? Number(a.amount) - Number(b.amount)
          : Number(b.amount) - Number(a.amount),
      );
    }

    return result;
  }, [bookings, search, statusFilter, sportFilter, sortDirection]);

  // Sort
  const handleSort = () => {
    setSortDirection((previous) => {
      if (previous === null) return "asc";

      return previous === "asc" ? "desc" : "asc";
    });
  };

  // Filters
  const handleStatusChange = (value: "All" | BookingStatus) => {
    setStatusFilter(value);
  };

  const handleSportChange = (value: "All" | Sport) => {
    setSportFilter(value);
  };

  // Booking Status Update
  const handleUpdateStatus = (status: BookingStatus) => {
    if (!selectedBooking) return;

    dispatch(
      updateBookingStatus({
        id: selectedBooking.id,
        status,
      }),
    );

    setSelectedBooking(null);
  };

  // Add Booking
  const handleAddBooking = (booking: Booking) => {
    dispatch(addBooking(booking));
    setIsAddBookingOpen(false);
  };

  // Table Columns
  const columns: TableColumn<Booking>[] = [
    {
      key: "id",
      title: "Booking ID",

      render: (booking) => (
        <span
          className={`font-semibold ${
            isDark ? "text-violet-400" : "text-violet-600"
          }`}
        >
          #{booking.id}
        </span>
      ),
    },

    {
      key: "userName",
      title: "User",

      render: (booking) => (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              isDark
                ? "bg-violet-400/10 text-violet-400"
                : "bg-violet-50 text-violet-600"
            }`}
          >
            {booking.userName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p
              className={`truncate font-semibold ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {booking.userName}
            </p>

            <p
              className={`truncate text-xs ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {booking.userEmail}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "venueName",
      title: "Venue",

      render: (booking) => (
        <div>
          <p
            className={`font-medium ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {booking.venueName}
          </p>

          <p
            className={`mt-1 text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {booking.city}
          </p>
        </div>
      ),
    },

    {
      key: "sport",
      title: "Sport",

      render: (booking) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getSportClass(
            booking.sport,
          )}`}
        >
          {booking.sport}
        </span>
      ),
    },

    {
      key: "date",
      title: "Date & Slot",

      render: (booking) => (
        <div>
          <p
            className={`font-medium ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {formatDate(booking.date)}
          </p>

          <p
            className={`mt-1 flex items-center gap-1 text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            <FiClock size={12} />
            {booking.slot}
          </p>
        </div>
      ),
    },

    {
      key: "amount",

      title: (
        <button
          type="button"
          onClick={handleSort}
          className={`flex items-center gap-2 transition ${
            isDark ? "hover:text-violet-400" : "hover:text-violet-600"
          }`}
        >
          Amount
          <span>
            {sortDirection === null ? "↕" : sortDirection === "asc" ? "↑" : "↓"}
          </span>
        </button>
      ),

      render: (booking) => (
        <span
          className={`font-semibold ${
            isDark ? "text-slate-200" : "text-slate-800"
          }`}
        >
          {formatAmount(booking.amount)}
        </span>
      ),
    },

    {
      key: "status",
      title: "Status",

      render: (booking) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
            booking.status,
          )}`}
        >
          {booking.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Bookings
          </h1>

          <p
            className={`mt-1 text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Manage and monitor all sports bookings.
          </p>
        </div>

        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsAddBookingOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.98] cursor-pointer"
          >
            <span className="text-lg leading-none">+</span>
            Add Booking
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div
        className={`rounded-2xl border p-4 shadow-sm ${
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
              size={18}
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search booking ID, user, venue, sport"
              className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-violet-500 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              }`}
            />
          </div>

          {/* Status */}
          <div className="relative">
            <FiFilter
              className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
              size={16}
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                handleStatusChange(event.target.value as "All" | BookingStatus)
              }
              className={`h-11 min-w-42.5 appearance-none rounded-xl border pl-9 pr-10 text-sm font-medium outline-none transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              }`}
            >
              {bookingStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <FiChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
              size={16}
            />
          </div>

          {/* Sport */}
          <div className="relative">
            <select
              value={sportFilter}
              onChange={(event) =>
                handleSportChange(event.target.value as "All" | Sport)
              }
              className={`h-11 min-w-42.5 appearance-none rounded-xl border px-4 pr-10 text-sm font-medium outline-none transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              }`}
            >
              {sportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <FiChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        columns={columns}
        data={filteredBookings}
        onRowClick={(booking) => setSelectedBooking(booking)}
        emptyText="No bookings found."
        itemsPerPage={5}
      />

      {/* Booking Details Drawer */}
      <BookingDetailsDrawer
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdateStatus={handleUpdateStatus}
        isAdmin={isAdmin}
      />

      {/* Add Booking Modal */}
      <AddBookingModal
        isOpen={isAddBookingOpen}
        onClose={() => setIsAddBookingOpen(false)}
        onSubmit={handleAddBooking}
      />
    </div>
  );
};

export default Bookings;
