import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiFilter, FiSearch } from "react-icons/fi";

import type { RootState, AppDispatch } from "../../store/store";
import type { Vendor, VendorStatus } from "../../data/vendors";
import { updateVendorStatus } from "../../store/vendor/vendorSlice";

import CustomTable, {
  type TableColumn,
} from "../../components/common/CustomTable";

import { vendorStatus } from "../../utils";
import VendorDetailsDrawer from "../../components/vendors/VendorDetailsDrawer";

import { useTheme } from "../../context/ThemeContext";

const Vendors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const vendors = useSelector((state: RootState) => state.vendors.items);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | VendorStatus>(
    "All",
  );
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // STATUS STYLE
  const getStatusClass = (status: VendorStatus) => {
    switch (status) {
      case "Active":
        return isDark
          ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20"
          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

      case "Inactive":
        return isDark
          ? "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
          : "bg-slate-100 text-slate-600 ring-1 ring-slate-200";

      case "Pending Verification":
        return isDark
          ? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20"
          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

      default:
        return isDark
          ? "bg-slate-800 text-slate-400 ring-1 ring-slate-700"
          : "bg-slate-50 text-slate-600 ring-1 ring-slate-200";
    }
  };

  // SEARCH FILTER
  const filteredVendors = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesSearch =
        !searchValue ||
        vendor.vendorName.toLowerCase().includes(searchValue) ||
        vendor.email.toLowerCase().includes(searchValue) ||
        vendor.city.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || vendor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vendors, search, statusFilter]);

  // UPDATE STATUS
  const handleUpdateStatus = (status: VendorStatus) => {
    if (!selectedVendor) return;

    dispatch(
      updateVendorStatus({
        id: selectedVendor.id,
        status,
      }),
    );

    setSelectedVendor(null);
  };

  // TABLE COLUMNS
  const columns: TableColumn<Vendor>[] = [
    {
      key: "vendorName",
      title: "Vendor",

      render: (vendor) => (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              isDark
                ? "bg-violet-400/10 text-violet-400"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {vendor.vendorName.charAt(0).toUpperCase()}
          </div>

          {/* Vendor info */}
          <div className="min-w-0">
            <p
              className={`truncate font-semibold ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {vendor.vendorName}
            </p>

            <p
              className={`truncate text-xs ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              {vendor.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "city",
      title: "City",

      render: (vendor) => (
        <span
          className={`font-medium ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {vendor.city}
        </span>
      ),
    },

    {
      key: "totalBookings",
      title: "Bookings",

      render: (vendor) => (
        <span
          className={`font-semibold ${
            isDark ? "text-slate-200" : "text-slate-800"
          }`}
        >
          {vendor.totalBookings}
        </span>
      ),
    },

    {
      key: "status",
      title: "Status",

      render: (vendor) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
            vendor.status,
          )}`}
        >
          {vendor.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* PAGE HEADER */}
      <div>
        <h1
          className={`text-2xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Vendors
        </h1>

        <p
          className={`mt-1 text-sm ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Manage and monitor all sports vendors.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div
        className={`rounded-2xl border p-4 shadow-sm ${
          isDark
            ? "border-slate-800 bg-slate-900"
            : "border-slate-200 bg-white"
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
              placeholder="Search vendor, email, city..."
              className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:border-violet-500 focus:bg-slate-800 focus:ring-2 focus:ring-violet-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              }`}
            />
          </div>

          {/* Status Filter */}
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
                setStatusFilter(event.target.value as "All" | VendorStatus)
              }
              className={`h-11 min-w-52 appearance-none rounded-xl border pl-9 pr-10 text-sm font-medium outline-none transition ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-700 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              }`}
            >
              {vendorStatus.map((option) => (
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

      {/* VENDOR TABLE */}
      <CustomTable
        columns={columns}
        data={filteredVendors}
        onRowClick={(vendor) => {
          setSelectedVendor(vendor);
        }}
        emptyText="No vendors found."
        itemsPerPage={5}
      />

      {/* VENDOR DETAILS DRAWER */}
      <VendorDetailsDrawer
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Vendors;