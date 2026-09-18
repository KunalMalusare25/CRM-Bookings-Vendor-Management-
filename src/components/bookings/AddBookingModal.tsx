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
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const booking: Booking = {
      //   id: `BK-${Date.now()}`, You Can use this also
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
              Booking Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Add New Booking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new sports venue booking.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="space-y-6">
              {/* Customer */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <FiUser size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Customer Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Enter customer details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* User Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      User Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiUser
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="userName"
                        type="text"
                        required
                        placeholder="Enter customer name"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiMail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="userEmail"
                        type="email"
                        required
                        placeholder="customer@email.com"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiPhone
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="userPhone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div className="border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <FiMapPin size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Venue Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Select booking venue
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Venue */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Venue Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      name="venueName"
                      type="text"
                      required
                      placeholder="Enter venue name"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      City
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      name="city"
                      type="text"
                      required
                      placeholder="Enter city"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Venue Address
                    </label>

                    <input
                      name="venueAddress"
                      type="text"
                      placeholder="Enter venue address"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>
              </div>

              {/* Booking */}
              <div className="border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <FiCalendar size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Booking Information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Configure sport, date and slot
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Sport */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Sport
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      name="sport"
                      required
                      defaultValue=""
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
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
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Booking Date
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiCalendar
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="date"
                        type="date"
                        required
                        min={today}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Slot */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Time Slot
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiClock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="slot"
                        type="text"
                        required
                        placeholder="06:00 PM - 07:00 PM"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Amount
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FiCreditCard
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        name="amount"
                        type="number"
                        min="0"
                        required
                        placeholder="Enter amount"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      defaultValue="Pending"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
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
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
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
