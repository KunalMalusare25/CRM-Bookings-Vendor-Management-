import { FiCalendar, FiClock, FiMapPin, FiUser, FiX } from "react-icons/fi";

import type { Booking, BookingStatus } from "../../data/bookings";
import { formatDate, formatAmount } from "../../utils";
import { useTheme } from "../../context/ThemeContext";

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdateStatus: (status: BookingStatus) => void;
  isAdmin: boolean;
}

const BookingDetailsDrawer = ({
  booking,
  onClose,
  onUpdateStatus,
  isAdmin,
}: BookingDetailsDrawerProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          isDark ? "bg-black/60" : "bg-slate-900/40"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col shadow-2xl transition-colors ${
          isDark ? "border-l border-slate-800 bg-slate-950" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-violet-400" : "text-indigo-500"
              }`}
            >
              Booking Details
            </p>

            <h2
              className={`mt-1 text-lg font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              #{booking.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              isDark
                ? "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Summary */}
          <div
            className={`rounded-2xl p-5 text-white ${
              isDark
                ? "bg-linear-to-br from-violet-600 via-violet-700 to-slate-900"
                : "bg-linear-to-br from-blue-400 to-violet-800"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-violet-200" : "text-indigo-100"
                  }`}
                >
                  Booking Amount
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {formatAmount(booking.amount)}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "Confirmed"
                    ? "bg-emerald-100 text-emerald-700"
                    : booking.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div
              className={`mt-5 grid grid-cols-2 gap-4 border-t pt-4 ${
                isDark ? "border-white/10" : "border-white/20"
              }`}
            >
              <div>
                <p
                  className={`text-xs ${
                    isDark ? "text-violet-200" : "text-indigo-100"
                  }`}
                >
                  Sport
                </p>

                <p className="mt-1 font-semibold">{booking.sport}</p>
              </div>

              <div>
                <p
                  className={`text-xs ${
                    isDark ? "text-violet-200" : "text-indigo-100"
                  }`}
                >
                  Date
                </p>

                <p className="mt-1 font-semibold">{formatDate(booking.date)}</p>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="mt-6">
            <h3
              className={`text-sm font-bold uppercase tracking-wide ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Customer
            </h3>

            <div
              className={`mt-3 rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    isDark
                      ? "bg-violet-400/10 text-violet-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <FiUser size={19} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`font-semibold ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    {booking.userName}
                  </p>

                  <p
                    className={`truncate text-sm ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {booking.userEmail}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 border-t pt-4 ${
                  isDark ? "border-slate-800" : "border-slate-100"
                }`}
              >
                <p
                  className={`text-xs font-medium ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Phone
                </p>

                <p
                  className={`mt-1 text-sm font-medium ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {booking.userPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="mt-6">
            <h3
              className={`text-sm font-bold uppercase tracking-wide ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Venue
            </h3>

            <div
              className={`mt-3 rounded-2xl border p-4 ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    isDark
                      ? "bg-sky-400/10 text-sky-400"
                      : "bg-sky-50 text-sky-600"
                  }`}
                >
                  <FiMapPin size={19} />
                </div>

                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-slate-100" : "text-slate-800"
                    }`}
                  >
                    {booking.venueName}
                  </p>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {booking.venueAddress}
                  </p>

                  <p
                    className={`mt-1 text-sm font-medium ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {booking.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-6">
            <h3
              className={`text-sm font-bold uppercase tracking-wide ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Schedule
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {/* Date */}
              <div
                className={`rounded-xl border p-4 ${
                  isDark
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <FiCalendar
                  className={isDark ? "text-violet-400" : "text-indigo-500"}
                  size={18}
                />

                <p
                  className={`mt-3 text-xs ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Date
                </p>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {formatDate(booking.date)}
                </p>
              </div>

              {/* Time */}
              <div
                className={`rounded-xl border p-4 ${
                  isDark
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <FiClock
                  className={isDark ? "text-violet-400" : "text-indigo-500"}
                  size={18}
                />

                <p
                  className={`mt-3 text-xs ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Time Slot
                </p>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {booking.slot}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isAdmin && (
          <div
            className={`border-t p-5 ${
              isDark
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Cancel */}
              <button
                type="button"
                disabled={booking.status === "Cancelled"}
                onClick={() => onUpdateStatus("Cancelled")}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  isDark
                    ? "border-red-400/20 bg-red-400/10 text-red-400 hover:bg-red-400/20"
                    : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                Cancel Booking
              </button>

              {/* Confirm */}
              <button
                type="button"
                disabled={booking.status === "Confirmed"}
                onClick={() => onUpdateStatus("Confirmed")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
                  isDark
                    ? "bg-violet-600 text-white hover:bg-violet-500"
                    : "bg-slate-900 text-white hover:bg-blue-400"
                }`}
              >
                Mark as Confirmed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsDrawer;
