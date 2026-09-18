import { message } from "antd";
import { useState } from "react";
import {
  FiBell,
  FiCheck,
  FiLock,
  FiMail,
  FiMoon,
  FiSave,
  FiShield,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+91 00000 00000");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [vendorNotifications, setVendorNotifications] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saved, setSaved] = useState(false);

  const handleSaveChanges = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.warning("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.warning("New password and confirm password do not match.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);

    message.success("Password changed successfully.");
  };

  return (
    <div
      className={`
        min-h-full px-4 py-6 transition-colors
        sm:px-6 lg:px-8
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
      `}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className={`mb-2 text-sm font-medium ${
                isDark ? "text-violet-400" : "text-violet-600"
              }`}
            >
              Account Settings
            </p>

            <h1
              className={`
                text-2xl font-bold tracking-tight sm:text-3xl
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              Settings
            </h1>

            <p
              className={`
                mt-2 text-sm sm:text-base
                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              Manage your profile, preferences and account security.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveChanges}
            className={`
              inline-flex items-center justify-center gap-2
              rounded-xl px-5 py-3
              text-sm font-semibold text-white
              shadow-sm transition
              ${
                isDark
                  ? "bg-violet-600 hover:bg-violet-500"
                  : "bg-slate-900 hover:bg-slate-800"
              }
            `}
          >
            {saved ? <FiCheck size={17} /> : <FiSave size={17} />}
            {saved ? "Changes Saved" : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <section
            className={`
              rounded-2xl border shadow-sm
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            <div
              className={`
                border-b px-5 py-5 sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isDark
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-violet-50 text-violet-600"
                    }
                  `}
                >
                  <FiUser size={20} />
                </div>

                <div>
                  <h2
                    className={`
                      font-semibold
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}
                  >
                    Profile Information
                  </h2>

                  <p
                    className={`
                      mt-0.5 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Update your personal account information.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {/* Avatar */}
              <div className="mb-7 flex items-center gap-4">
                <div
                  className={`
                    flex h-14 w-14 items-center justify-center
                    rounded-full text-lg font-semibold
                    ${
                      isDark
                        ? "bg-violet-500/15 text-violet-400"
                        : "bg-slate-900 text-white"
                    }
                  `}
                >
                  AU
                </div>

                <div>
                  <p
                    className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    {user?.name}
                  </p>

                  <p
                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {user?.role === "admin"
                      ? "Administrator account"
                      : "Support account"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    className={`
                      mb-2 block text-sm font-medium
                      ${isDark ? "text-slate-300" : "text-slate-700"}
                    `}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={`
                      h-11 w-full rounded-xl border px-4
                      text-sm outline-none transition
                      placeholder:text-slate-400
                      ${
                        isDark
                          ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                          : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                      }
                    `}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`
                      mb-2 block text-sm font-medium
                      ${isDark ? "text-slate-300" : "text-slate-700"}
                    `}
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={17}
                      className={`
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        ${isDark ? "text-slate-500" : "text-slate-400"}
                      `}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={`
                        h-11 w-full rounded-xl border
                        pl-11 pr-4 text-sm outline-none transition
                        ${
                          isDark
                            ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                            : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                        }
                      `}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    className={`
                      mb-2 block text-sm font-medium
                      ${isDark ? "text-slate-300" : "text-slate-700"}
                    `}
                  >
                    Phone Number
                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={`
                      h-11 w-full rounded-xl border px-4
                      text-sm outline-none transition
                      ${
                        isDark
                          ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                          : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                      }
                    `}
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    className={`
                      mb-2 block text-sm font-medium
                      ${isDark ? "text-slate-300" : "text-slate-700"}
                    `}
                  >
                    Role
                  </label>

                  <input
                    type="text"
                    value={
                      user?.role === "admin"
                        ? "Administrator"
                        : "Support"
                    }
                    disabled
                    className={`
                      h-11 w-full cursor-not-allowed rounded-xl
                      border px-4 text-sm
                      ${
                        isDark
                          ? "border-slate-800 bg-slate-800 text-slate-500"
                          : "border-slate-200 bg-slate-50 text-slate-500"
                      }
                    `}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section
            className={`
              rounded-2xl border shadow-sm
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            <div
              className={`
                border-b px-5 py-5 sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isDark
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-amber-50 text-amber-600"
                    }
                  `}
                >
                  <FiBell size={20} />
                </div>

                <div>
                  <h2
                    className={`
                      font-semibold
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}
                  >
                    Notifications
                  </h2>

                  <p
                    className={`
                      mt-0.5 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Choose which notifications you want to receive.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`
                divide-y
                ${isDark ? "divide-slate-800" : "divide-slate-100"}
              `}
            >
              {/* Email notifications */}
              <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div>
                  <h3
                    className={`
                      text-sm font-medium
                      ${isDark ? "text-slate-200" : "text-slate-900"}
                    `}
                  >
                    Email Notifications
                  </h3>

                  <p
                    className={`
                      mt-1 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Receive important updates and account notifications by
                    email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEmailNotifications((previous) => !previous)}
                  className={`
                    relative h-6 w-11 shrink-0 rounded-full transition
                    ${
                      emailNotifications
                        ? "bg-violet-600"
                        : isDark
                          ? "bg-slate-700"
                          : "bg-slate-300"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute top-1 h-4 w-4 rounded-full
                      bg-white shadow-sm transition
                      ${emailNotifications ? "left-6" : "left-1"}
                    `}
                  />
                </button>
              </div>

              {/* Booking notifications */}
              <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div>
                  <h3
                    className={`
                      text-sm font-medium
                      ${isDark ? "text-slate-200" : "text-slate-900"}
                    `}
                  >
                    Booking Updates
                  </h3>

                  <p
                    className={`
                      mt-1 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Get notified when booking statuses are changed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setBookingNotifications((previous) => !previous)
                  }
                  className={`
                    relative h-6 w-11 shrink-0 rounded-full transition
                    ${
                      bookingNotifications
                        ? "bg-violet-600"
                        : isDark
                          ? "bg-slate-700"
                          : "bg-slate-300"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute top-1 h-4 w-4 rounded-full
                      bg-white shadow-sm transition
                      ${bookingNotifications ? "left-6" : "left-1"}
                    `}
                  />
                </button>
              </div>

              {/* Vendor notifications */}
              <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
                <div>
                  <h3
                    className={`
                      text-sm font-medium
                      ${isDark ? "text-slate-200" : "text-slate-900"}
                    `}
                  >
                    Vendor Updates
                  </h3>

                  <p
                    className={`
                      mt-1 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Receive notifications about vendor status changes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setVendorNotifications((previous) => !previous)
                  }
                  className={`
                    relative h-6 w-11 shrink-0 rounded-full transition
                    ${
                      vendorNotifications
                        ? "bg-violet-600"
                        : isDark
                          ? "bg-slate-700"
                          : "bg-slate-300"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute top-1 h-4 w-4 rounded-full
                      bg-white shadow-sm transition
                      ${vendorNotifications ? "left-6" : "left-1"}
                    `}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section
            className={`
              rounded-2xl border shadow-sm
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            <div
              className={`
                border-b px-5 py-5 sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isDark
                        ? "bg-sky-500/10 text-sky-400"
                        : "bg-sky-50 text-sky-600"
                    }
                  `}
                >
                  {isDark ? <FiMoon size={20} /> : <FiSun size={20} />}
                </div>

                <div>
                  <h2
                    className={`
                      font-semibold
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}
                  >
                    Appearance
                  </h2>

                  <p
                    className={`
                      mt-0.5 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Customize how the dashboard looks.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div>
                <h3
                  className={`
                    text-sm font-medium
                    ${isDark ? "text-slate-200" : "text-slate-900"}
                  `}
                >
                  Theme
                </h3>

                <p
                  className={`
                    mt-1 text-sm
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Select your preferred dashboard theme.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
                {/* Light */}
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`
                    flex items-center justify-center gap-2
                    rounded-xl border px-4 py-3
                    text-sm font-medium transition
                    ${
                      !isDark
                        ? "border-violet-300 bg-violet-50 text-violet-700"
                        : "border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800"
                    }
                  `}
                >
                  <FiSun size={17} />
                  Light
                </button>

                {/* Dark */}
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`
                    flex items-center justify-center gap-2
                    rounded-xl border px-4 py-3
                    text-sm font-medium transition
                    ${
                      isDark
                        ? "border-violet-500/40 bg-violet-500/10 text-violet-400"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <FiMoon size={17} />
                  Dark
                </button>
              </div>
            </div>
          </section>

          {/* Security */}
          <section
            className={`
              rounded-2xl border shadow-sm
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            <div
              className={`
                border-b px-5 py-5 sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isDark
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                    }
                  `}
                >
                  <FiShield size={20} />
                </div>

                <div>
                  <h2
                    className={`
                      font-semibold
                      ${isDark ? "text-white" : "text-slate-900"}
                    `}
                  >
                    Security
                  </h2>

                  <p
                    className={`
                      mt-0.5 text-sm
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    Manage your password and account security.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3
                  className={`
                    text-sm font-medium
                    ${isDark ? "text-slate-200" : "text-slate-900"}
                  `}
                >
                  Password
                </h3>

                <p
                  className={`
                    mt-1 text-sm
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Keep your account secure by using a strong password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className={`
                  inline-flex items-center justify-center gap-2
                  rounded-xl border px-4 py-2.5
                  text-sm font-semibold transition
                  ${
                    isDark
                      ? "border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                <FiLock size={16} />
                Change Password
              </button>
            </div>
          </section>

          {/* Bottom Save */}
          <div className="flex justify-end pb-6">
            <button
              type="button"
              onClick={handleSaveChanges}
              className={`
                inline-flex items-center justify-center gap-2
                rounded-xl px-6 py-3
                text-sm font-semibold text-white
                shadow-sm transition
                ${
                  isDark
                    ? "bg-violet-600 hover:bg-violet-500"
                    : "bg-slate-900 hover:bg-slate-800"
                }
              `}
            >
              {saved ? <FiCheck size={17} /> : <FiSave size={17} />}
              {saved ? "Changes Saved" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-slate-950/60 px-4 backdrop-blur-sm
          `}
        >
          <div
            className={`
              w-full max-w-md rounded-2xl shadow-2xl
              ${isDark ? "bg-slate-900" : "bg-white"}
            `}
          >
            {/* Modal Header */}
            <div
              className={`
                flex items-center justify-between
                border-b px-5 py-4 sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <div>
                <h2
                  className={`
                    text-lg font-semibold
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  Change Password
                </h2>

                <p
                  className={`
                    mt-1 text-sm
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Update your account password.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-lg transition
                  ${
                    isDark
                      ? "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }
                `}
              >
                <FiX size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5 sm:p-6">
              {/* Current Password */}
              <div>
                <label
                  className={`
                    mb-2 block text-sm font-medium
                    ${isDark ? "text-slate-300" : "text-slate-700"}
                  `}
                >
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Enter current password"
                  className={`
                    h-11 w-full rounded-xl border px-4
                    text-sm outline-none transition
                    placeholder:text-slate-400
                    ${
                      isDark
                        ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                    }
                  `}
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  className={`
                    mb-2 block text-sm font-medium
                    ${isDark ? "text-slate-300" : "text-slate-700"}
                  `}
                >
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter new password"
                  className={`
                    h-11 w-full rounded-xl border px-4
                    text-sm outline-none transition
                    placeholder:text-slate-400
                    ${
                      isDark
                        ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                    }
                  `}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className={`
                    mb-2 block text-sm font-medium
                    ${isDark ? "text-slate-300" : "text-slate-700"}
                  `}
                >
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm new password"
                  className={`
                    h-11 w-full rounded-xl border px-4
                    text-sm outline-none transition
                    placeholder:text-slate-400
                    ${
                      isDark
                        ? "border-slate-800 bg-slate-950 text-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        : "border-slate-200 bg-white text-slate-900 focus:border-violet-400 focus:ring-4 focus:ring-violet-400/10"
                    }
                  `}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className={`
                flex flex-col-reverse gap-3
                border-t p-5 sm:flex-row sm:justify-end sm:px-6
                ${isDark ? "border-slate-800" : "border-slate-100"}
              `}
            >
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className={`
                  rounded-xl border px-4 py-2.5
                  text-sm font-semibold transition
                  ${
                    isDark
                      ? "border-slate-800 text-slate-300 hover:bg-slate-800"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleChangePassword}
                className={`
                  inline-flex items-center justify-center gap-2
                  rounded-xl px-4 py-2.5
                  text-sm font-semibold text-white transition
                  ${
                    isDark
                      ? "bg-violet-600 hover:bg-violet-500"
                      : "bg-slate-900 hover:bg-slate-800"
                  }
                `}
              >
                <FiLock size={16} />
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
