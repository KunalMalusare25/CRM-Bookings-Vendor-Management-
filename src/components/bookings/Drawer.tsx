import { FiCalendar, FiClock, FiMapPin, FiUser, FiX } from "react-icons/fi";
import type { Booking, BookingStatus } from "../../data/bookings";
import { formatDate, formatAmount } from "../../utils";

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onUpdateStatus: (status: BookingStatus) => void;
}

const BookingDetailsDrawer = ({
  booking,
  onClose,
  onUpdateStatus,
}: BookingDetailsDrawerProps) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              Booking Details
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              #{booking.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Summary */}
          <div className="rounded-2xl bg-linear-to-br from-blue-400 to-violet-800 p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-indigo-100">Booking Amount</p>

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

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div>
                <p className="text-xs text-indigo-100">Sport</p>
                <p className="mt-1 font-semibold">{booking.sport}</p>
              </div>

              <div>
                <p className="text-xs text-indigo-100">Date</p>
                <p className="mt-1 font-semibold">{formatDate(booking.date)}</p>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Customer
            </h3>

            <div className="mt-3 rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <FiUser size={19} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {booking.userName}
                  </p>

                  <p className="text-sm text-slate-400">{booking.userEmail}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-xs font-medium text-slate-400">Phone</p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {booking.userPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Venue
            </h3>

            <div className="mt-3 rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <FiMapPin size={19} />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {booking.venueName}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {booking.venueAddress}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {booking.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Schedule
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <FiCalendar className="text-indigo-500" size={18} />

                <p className="mt-3 text-xs text-slate-400">Date</p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {formatDate(booking.date)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <FiClock className="text-indigo-500" size={18} />

                <p className="mt-3 text-xs text-slate-400">Time Slot</p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {booking.slot}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={booking.status === "Cancelled"}
              onClick={() => onUpdateStatus("Cancelled")}
              className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel Booking
            </button>

            <button
              type="button"
              disabled={booking.status === "Confirmed"}
              onClick={() => onUpdateStatus("Confirmed")}
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark as Confirmed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsDrawer;
