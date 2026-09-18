export type VendorStatus =
  | "Active"
  | "Inactive"
  | "Pending Verification";

export interface Vendor {
  id: string;

  vendorName: string;
  email: string;
  phone: string;

  city: string;
  address: string;

  status: VendorStatus;

  totalBookings: number;
  joinedDate: string;
}

export const vendors: Vendor[] = [
  {
    id: "VN-1001",
    vendorName: "Sports Arena",
    email: "sportsarena@gmail.com",
    phone: "9876543210",
    city: "Pune",
    address: "Baner Road, Pune",
    status: "Active",
    totalBookings: 24,
    joinedDate: "2026-05-12",
  },
  {
    id: "VN-1002",
    vendorName: "Green Turf",
    email: "greenturf@gmail.com",
    phone: "9876501234",
    city: "Satara",
    address: "Wakad, Pune",
    status: "Pending Verification",
    totalBookings: 12,
    joinedDate: "2026-07-20",
  },
  {
    id: "VN-1003",
    vendorName: "Elite Sports Club",
    email: "elitesports@gmail.com",
    phone: "9898989898",
    city: "Mumbai",
    address: "Andheri West, Mumbai",
    status: "Active",
    totalBookings: 31,
    joinedDate: "2026-04-08",
  },
  {
    id: "VN-1004",
    vendorName: "Victory Ground",
    email: "victoryground@gmail.com",
    phone: "9765432109",
    city: "Nashik",
    address: "College Road, Nashik",
    status: "Inactive",
    totalBookings: 7,
    joinedDate: "2026-02-15",
  },
];