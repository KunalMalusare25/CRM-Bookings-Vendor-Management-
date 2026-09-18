import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMail,
  FiPhone,
  FiUser,
  FiX,
  FiCreditCard,
} from "react-icons/fi";

import type { Booking, BookingStatus, Sport } from "../../data/bookings";
import { useTheme } from "../../context/ThemeContext";

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
}

const AddBookingModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddBookingModalProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const booking: Booking = {
      // id: `BK-${Date.now()}`,
      id: "BK-1005",
      userName: String(formData.get("userName") || ""),
      userEmail: String(formData.get("userEmail") || ""),
      userPhone: String(formData.get("userPhone") || ""),
      venueName: String(formData.get("venueName") || ""),
      venueAddress: String(formData.get("venueAddress") || ""),
      city: String(formData.get("city") || ""),
      sport: formData.get("sport") as Sport,
      date: String(formData.get("date") || ""),
      slot: String(formData.get("slot") || ""),
      amount: Number(formData.get("amount") || 0),
      status: formData.get("status") as BookingStatus,
    };

    onSubmit(booking);
  };

  const today = new Date().toISOString().split("T")[0];

  const inputClass = `h-11 w-full rounded-xl border px-4 text-sm outline-none transition ${
    isDark
      ? "border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-violet-500 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500/10"
      : "border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
  }`;

  const inputWithIconClass = `h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${
    isDark
      ? "border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-violet-500 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500/10"
      : "border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
  }`;

  const labelClass = `mb-1.5 block text-sm font-medium ${
    isDark ? "text-slate-300" : "text-slate-700"
  }`;

  const iconClass = isDark ? "text-slate-500" : "text-slate-400";

  const sectionTitleClass = `text-sm font-bold ${
    isDark ? "text-slate-100" : "text-slate-900"
  }`;

  const sectionDescriptionClass = `text-xs ${
    isDark ? "text-slate-500" : "text-slate-400"
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          isDark ? "bg-black/60" : "bg-slate-950/40"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl transition-colors ${
          isDark
            ? "border border-slate-800 bg-slate-950"
            : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-start justify-between border-b px-5 py-4 sm:px-6 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                isDark ? "text-violet-400" : "text-indigo-600"
              }`}
            >
              Booking Management
            </p>

            <h2
              className={`mt-1 text-xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Add New Booking
            </h2>

            <p
              className={`mt-1 text-sm ${
                isDark ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Create a new sports venue booking.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              isDark
                ? "border-slate-700 text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                : "border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="space-y-6">

              {/* ================= CUSTOMER ================= */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isDark
                        ? "bg-violet-400/10 text-violet-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <FiUser size={17} />
                  </div>

                  <div>
                    <h3 className={sectionTitleClass}>
                      Customer Information
                    </h3>

                    <p className={sectionDescriptionClass}>
                      Enter customer details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* User Name */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      User Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiUser
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="userName"
                        type="text"
                        required
                        placeholder="Enter customer name"
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>
                      Email
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiMail
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="userEmail"
                        type="email"
                        required
                        placeholder="customer@email.com"
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>
                      Phone
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiPhone
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="userPhone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= VENUE ================= */}
              <div
                className={`border-t pt-6 ${
                  isDark ? "border-slate-800" : "border-slate-100"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isDark
                        ? "bg-sky-400/10 text-sky-400"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    <FiMapPin size={17} />
                  </div>

                  <div>
                    <h3 className={sectionTitleClass}>
                      Venue Information
                    </h3>

                    <p className={sectionDescriptionClass}>
                      Select booking venue
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Venue */}
                  <div>
                    <label className={labelClass}>
                      Venue Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      name="venueName"
                      type="text"
                      required
                      placeholder="Enter venue name"
                      className={inputClass}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className={labelClass}>
                      City
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      name="city"
                      type="text"
                      required
                      placeholder="Enter city"
                      className={inputClass}
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Venue Address
                    </label>

                    <input
                      name="venueAddress"
                      type="text"
                      placeholder="Enter venue address"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* ================= BOOKING ================= */}
              <div
                className={`border-t pt-6 ${
                  isDark ? "border-slate-800" : "border-slate-100"
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isDark
                        ? "bg-violet-400/10 text-violet-400"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    <FiCalendar size={17} />
                  </div>

                  <div>
                    <h3 className={sectionTitleClass}>
                      Booking Information
                    </h3>

                    <p className={sectionDescriptionClass}>
                      Configure sport, date and slot
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Sport */}
                  <div>
                    <label className={labelClass}>
                      Sport
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      name="sport"
                      required
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select sport
                      </option>

                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Tennis">Tennis</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className={labelClass}>
                      Booking Date
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiCalendar
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="date"
                        type="date"
                        required
                        min={today}
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>

                  {/* Slot */}
                  <div>
                    <label className={labelClass}>
                      Time Slot
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiClock
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="slot"
                        type="text"
                        required
                        placeholder="06:00 PM - 07:00 PM"
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className={labelClass}>
                      Amount
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiCreditCard
                        size={16}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClass}`}
                      />

                      <input
                        name="amount"
                        type="number"
                        min="0"
                        required
                        placeholder="Enter amount"
                        className={inputWithIconClass}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Status
                    </label>

                    <select
                      name="status"
                      defaultValue="Pending"
                      className={inputClass}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`flex flex-col-reverse gap-3 border-t px-5 py-4 sm:flex-row sm:justify-end sm:px-6 ${
              isDark
                ? "border-slate-800 bg-slate-950"
                : "border-slate-200 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`h-11 rounded-xl border px-5 text-sm font-semibold transition ${
                isDark
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] ${
                isDark
                  ? "bg-violet-600 hover:bg-violet-500"
                  : "bg-slate-900 hover:bg-blue-400"
              }`}
            >
              Add Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookingModal;