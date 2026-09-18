import { useEffect, useState } from "react";
import {
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";

import type { Vendor, VendorStatus } from "../../data/vendors";
import { formatDate } from "../../utils";
import { useTheme } from "../../context/ThemeContext";

interface VendorDetailsDrawerProps {
  vendor: Vendor | null;
  onClose: () => void;
  onUpdateStatus: (status: VendorStatus) => void;
}

const VendorDetailsDrawer = ({
  vendor,
  onClose,
  onUpdateStatus,
}: VendorDetailsDrawerProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [status, setStatus] = useState<VendorStatus>(
    vendor?.status ?? "Pending Verification",
  );

  useEffect(() => {
    if (vendor) {
      setStatus(vendor.status);
    }
  }, [vendor]);

  if (!vendor) return null;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as VendorStatus);
  };

  const handleUpdateStatus = () => {
    onUpdateStatus(status);
  };

  const getStatusClass = (status: VendorStatus) => {
    switch (status) {
      case "Active":
        return isDark
          ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "Inactive":
        return isDark
          ? "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

      case "Pending Verification":
        return isDark
          ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

      default:
        return isDark
          ? "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
          : "bg-slate-50 text-slate-600 ring-1 ring-slate-200";
    }
  };

  const sectionTitleClass = isDark
    ? "text-slate-500"
    : "text-slate-400";

  const cardClass = isDark
    ? "border-slate-800 bg-slate-900"
    : "border-slate-200 bg-white";

  const iconBoxClass = isDark
    ? "bg-slate-800 text-slate-400"
    : "bg-slate-50 text-slate-500";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 ${
          isDark ? "bg-black/60" : "bg-slate-950/30"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          flex h-screen w-full max-w-md
          flex-col
          shadow-2xl
          ${isDark ? "bg-slate-950" : "bg-white"}
        `}
      >
        {/* HEADER */}
        <div
          className={`
            flex items-center justify-between
            border-b px-6 py-5
            ${isDark ? "border-slate-800" : "border-slate-200"}
          `}
        >
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.14em] ${sectionTitleClass}`}
            >
              Vendor Details
            </p>

            <h2
              className={`
                mt-1 text-xl font-bold tracking-tight
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              {vendor.vendorName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`
              cursor-pointer rounded-xl p-2 transition
              ${
                isDark
                  ? "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              }
            `}
          >
            <FiX size={21} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Vendor Profile */}
          <div className="flex items-center gap-4">
            <div
              className={`
                flex h-16 w-16 shrink-0
                items-center justify-center
                rounded-2xl
                text-xl font-bold
                ${
                  isDark
                    ? "bg-violet-500/15 text-violet-400"
                    : "bg-slate-900 text-white"
                }
              `}
            >
              {vendor.vendorName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3
                className={`
                  truncate text-lg font-bold
                  ${isDark ? "text-white" : "text-slate-900"}
                `}
              >
                {vendor.vendorName}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {vendor.id}
              </p>

              <span
                className={`
                  mt-2 inline-flex rounded-full
                  px-3 py-1 text-xs font-semibold
                  ${getStatusClass(vendor.status)}
                `}
              >
                {vendor.status}
              </span>
            </div>
          </div>

          {/* CONTACT */}
          <div className="mt-8">
            <h3
              className={`mb-3 text-xs font-bold uppercase tracking-[0.14em] ${sectionTitleClass}`}
            >
              Contact Information
            </h3>

            <div
              className={`divide-y rounded-2xl border ${
                isDark
                  ? "divide-slate-800 border-slate-800"
                  : "divide-slate-100 border-slate-200"
              }`}
            >
              {/* Email */}
              <div className="flex items-center gap-3 px-4 py-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBoxClass}`}
                >
                  <FiMail size={17} />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Email
                  </p>

                  <p
                    className={`
                      truncate text-sm font-medium
                      ${isDark ? "text-slate-200" : "text-slate-700"}
                    `}
                  >
                    {vendor.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 px-4 py-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBoxClass}`}
                >
                  <FiPhone size={17} />
                </div>

                <div>
                  <p
                    className={`text-xs ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Phone
                  </p>

                  <p
                    className={`
                      text-sm font-medium
                      ${isDark ? "text-slate-200" : "text-slate-700"}
                    `}
                  >
                    {vendor.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="mt-7">
            <h3
              className={`mb-3 text-xs font-bold uppercase tracking-[0.14em] ${sectionTitleClass}`}
            >
              Location
            </h3>

            <div className={`rounded-2xl border p-4 ${cardClass}`}>
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBoxClass}`}
                >
                  <FiMapPin size={17} />
                </div>

                <div>
                  <p
                    className={`
                      text-sm font-semibold
                      ${isDark ? "text-slate-200" : "text-slate-800"}
                    `}
                  >
                    {vendor.city}
                  </p>

                  <p
                    className={`
                      mt-1 text-sm
                      ${isDark ? "text-slate-500" : "text-slate-500"}
                    `}
                  >
                    {vendor.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VENDOR STATS */}
          <div className="mt-7">
            <h3
              className={`mb-3 text-xs font-bold uppercase tracking-[0.14em] ${sectionTitleClass}`}
            >
              Overview
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Bookings */}
              <div className={`rounded-2xl border p-4 ${cardClass}`}>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBoxClass}`}
                >
                  <FiActivity size={17} />
                </div>

                <p
                  className={`
                    mt-3 text-2xl font-bold
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  {vendor.totalBookings}
                </p>

                <p
                  className={`
                    mt-1 text-xs font-medium
                    ${isDark ? "text-slate-500" : "text-slate-400"}
                  `}
                >
                  Total Bookings
                </p>
              </div>

              {/* Joined */}
              <div className={`rounded-2xl border p-4 ${cardClass}`}>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBoxClass}`}
                >
                  <FiCalendar size={17} />
                </div>

                <p
                  className={`
                    mt-3 text-sm font-bold
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  {formatDate(vendor.joinedDate)}
                </p>

                <p
                  className={`
                    mt-1 text-xs font-medium
                    ${isDark ? "text-slate-500" : "text-slate-400"}
                  `}
                >
                  Joined Date
                </p>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="mt-7">
            <h3
              className={`mb-3 text-xs font-bold uppercase tracking-[0.14em] ${sectionTitleClass}`}
            >
              Update Status
            </h3>

            <div className="relative">
              <select
                value={status}
                onChange={handleStatusChange}
                className={`
                  h-11 w-full
                  appearance-none
                  rounded-xl
                  border
                  px-4 pr-10
                  text-sm font-medium
                  outline-none
                  transition
                  ${
                    isDark
                      ? "border-slate-800 bg-slate-900 text-slate-200 focus:border-violet-500 focus:bg-slate-900 focus:ring-2 focus:ring-violet-500/20"
                      : "border-slate-200 bg-slate-50 text-slate-700 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  }
                `}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>

                <option value="Pending Verification">
                  Pending Verification
                </option>
              </select>

              <FiChevronDown
                className={`
                  pointer-events-none
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  ${isDark ? "text-slate-500" : "text-slate-400"}
                `}
                size={16}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className={`
            border-t px-6 py-4
            ${isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}
          `}
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`
                flex-1 rounded-xl border
                px-4 py-3 text-sm font-semibold
                transition
                ${
                  isDark
                    ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/15"
                    : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                }
              `}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdateStatus}
              className={`
                flex-1 rounded-xl
                px-4 py-3
                text-sm font-semibold
                shadow-sm
                transition
                active:scale-[0.98]
                cursor-pointer
                ${
                  isDark
                    ? "bg-violet-600 text-white hover:bg-violet-500"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }
              `}
            >
              Update Status
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default VendorDetailsDrawer;