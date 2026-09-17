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