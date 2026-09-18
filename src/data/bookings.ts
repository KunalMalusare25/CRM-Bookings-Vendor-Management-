export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

export type Sport = "Football" | "Cricket" | "Badminton" | "Tennis";

export interface Booking {
  id: string;

  userName: string;
  userEmail: string;
  userPhone: string;

  venueName: string;
  venueAddress: string;
  city: string;

  sport: Sport;

  date: string;
  slot: string;

  amount: number;

  status: BookingStatus;
}

export const bookings: Booking[] = [
  {
    id: "BK-1001",
    userName: "Rahul Sharma",
    userEmail: "rahul@gmail.com",
    userPhone: "9876543210",
    venueName: "Sports Arena",
    venueAddress: "Baner Road",
    city: "Pune",
    sport: "Football",
    date: "2026-09-18",
    slot: "06:00 PM - 07:00 PM",
    amount: 1200,
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    userName: "Amit Patil",
    userEmail: "amit@gmail.com",
    userPhone: "9876501234",
    venueName: "Green Turf",
    venueAddress: "Wakad",
    city: "Pune",
    sport: "Cricket",
    date: "2026-09-18",
    slot: "07:00 PM - 09:00 PM",
    amount: 2500,
    status: "Pending",
  },
  {
    id: "BK-1003",
    userName: "Priya Kulkarni",
    userEmail: "priya@gmail.com",
    userPhone: "9898989898",
    venueName: "Sports Arena",
    venueAddress: "Baner Road",
    city: "Pune",
    sport: "Badminton",
    date: "2026-09-20",
    slot: "08:00 AM - 09:00 AM",
    amount: 1200,
    status: "Cancelled",
  },
  {
    id: "BK-1004",
    userName: "Rohan Deshmukh",
    userEmail: "rohan@gmail.com",
    userPhone: "9765432109",
    venueName: "Green Turf",
    venueAddress: "Wakad",
    city: "Pune",
    sport: "Tennis",
    date: "2026-09-20",
    slot: "06:00 PM - 08:00 PM",
    amount: 2500,
    status: "Confirmed",
  },
];
