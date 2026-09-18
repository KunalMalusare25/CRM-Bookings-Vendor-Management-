import type { UserRole } from "./store/auth/auth";

export const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@sportstik.com",
    password: "admin123",
    role: "admin" as UserRole,
  },
  {
    id: 2,
    name: "Support User",
    email: "support@sportstik.com",
    password: "support123",
    role: "support" as UserRole,
  },
];

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const bookingStatusOptions = [
  { value: "All", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Cancelled", label: "Cancelled" },
];

export const sportOptions = [
  { value: "All", label: "All Sports" },
  { value: "Football", label: "Football" },
  { value: "Cricket", label: "Cricket" },
  { value: "Badminton", label: "Badminton" },
  { value: "Tennis", label: "Tennis" },
];

// VENDOR OPTIONS
export const vendorStatus = [
  {value: "All", label: "All Status"},
  {value: "Active", label: "Active"},
  {value: "Inactive", label: "Inactive"},
  {value: "Pending Verification", label: "Pending Verification"},
]

export const getBookingDateTime = (date: string, slot: string) => {
  const [day, month, year] = date.split("/").map(Number);

  const timeMatch = slot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

  if (!timeMatch) {
    return new Date(year, month - 1, day).getTime();
  }

  let [, hour, minute, period] = timeMatch;

  let hours = Number(hour);
  const minutes = Number(minute);

  if (period.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes).getTime();
};