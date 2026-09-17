import {
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiMapPin,
  FiArrowUpRight,
  FiMoreHorizontal,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const stats = [
  {
    title: "Total Bookings",
    value: "1,248",
    change: "+12.5%",
    description: "vs. last month",
    icon: FiCalendar,
    positive: true,
  },
  {
    title: "Total Revenue",
    value: "₹4,82,500",
    change: "+8.2%",
    description: "vs. last month",
    icon: FiDollarSign,
    positive: true,
  },
  {
    title: "Active Vendors",
    value: "86",
    change: "+4.3%",
    description: "vs. last month",
    icon: FiMapPin,
    positive: true,
  },
  {
    title: "Registered Users",
    value: "2,845",
    change: "+10.1%",
    description: "vs. last month",
    icon: FiUsers,
    positive: true,
  },
];

const recentBookings = [
  {
    id: "BK-1024",
    user: "Rahul Sharma",
    initials: "RS",
    venue: "Elite Sports Arena",
    sport: "Football",
    date: "18 Sep 2026",
    amount: "₹1,200",
    status: "Confirmed",
  },
  {
    id: "BK-1023",
    user: "Amit Patil",
    initials: "AP",
    venue: "Smash Zone",
    sport: "Badminton",
    date: "18 Sep 2026",
    amount: "₹800",
    status: "Pending",
  },
  {
    id: "BK-1022",
    user: "Kunal Mehta",
    initials: "KM",
    venue: "Pro Cricket Ground",
    sport: "Cricket",
    date: "17 Sep 2026",
    amount: "₹2,500",
    status: "Confirmed",
  },
  {
    id: "BK-1021",
    user: "Sneha Joshi",
    initials: "SJ",
    venue: "Ace Tennis Club",
    sport: "Tennis",
    date: "17 Sep 2026",
    amount: "₹1,000",
    status: "Cancelled",
  },
];

const Dashboard = () => {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-slate-400">
            Thursday, 17 September 2026
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good evening, {user?.name?.split(" ")[0]}.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening with your bookings today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
            Export Report
          </button>

          <button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
            + New Booking
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={20} />
                </div>

                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50">
                  <FiMoreHorizontal size={18} />
                </button>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <div className="mt-1 flex flex-wrap items-end gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h2>

                <span className="mb-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <FiArrowUpRight size={14} />
                  {stat.change}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and quick overview */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
        {/* Activity chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Booking activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Booking volume over the last 7 days
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-500 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="mt-8 flex h-48 items-end gap-2 sm:gap-4">
            {[
              { day: "Mon", height: "45%" },
              { day: "Tue", height: "65%" },
              { day: "Wed", height: "52%" },
              { day: "Thu", height: "80%" },
              { day: "Fri", height: "68%" },
              { day: "Sat", height: "94%" },
              { day: "Sun", height: "72%" },
            ].map((item) => (
              <div
                key={item.day}
                className="flex min-w-0 flex-1 flex-col items-center gap-3"
              >
                <div className="flex h-40 w-full items-end justify-center rounded-lg bg-slate-50">
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-indigo-500 transition-all hover:bg-indigo-600"
                    style={{ height: item.height }}
                  />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">
            Booking status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current booking distribution
          </p>

          <div className="mt-7 flex items-center justify-center">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#6366f1 0deg 230deg, #f59e0b 230deg 300deg, #e2e8f0 300deg 360deg)",
              }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-slate-900">
                  1,248
                </span>

                <span className="text-xs text-slate-400">
                  Total bookings
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-500">Confirmed</span>
              </div>

              <span className="font-bold text-slate-800">64%</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-500">Pending</span>
              </div>

              <span className="font-bold text-slate-800">19%</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="text-slate-500">Cancelled</span>
              </div>

              <span className="font-bold text-slate-800">17%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent bookings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest bookings across all venues
            </p>
          </div>

          <a
            href="/bookings"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            View all bookings →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left">
            <thead className="bg-slate-50">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Sport</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="text-sm transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {booking.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
                        {booking.initials}
                      </div>

                      <span className="whitespace-nowrap font-medium text-slate-700">
                        {booking.user}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                    {booking.venue}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {booking.sport}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                    {booking.date}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {booking.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : booking.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;