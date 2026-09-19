import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { users } from "../../utils";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === formData.email.toLowerCase() &&
        item.password === formData.password,
    );

    if (!user) {
      message.error("Invalid email or password");
      return;
    }

    const { password, ...userData } = user;

    const token = `mock-token-${user.id}`;

    dispatch(
      login({
        user: userData,
        token,
      }),
    );

    message.success(`Welcome back, ${user.name}`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-xl shadow-slate-200/50 md:min-h-140 md:grid-cols-2">
          {/* LEFT SIDE */}
          <section className="relative min-h-105 overflow-hidden bg-[#b9d1fd] p-8 md:min-h-140 md:p-12">
            {/* Animated Background Circle 1 */}
            <div
              className="
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                bg-indigo-100
                opacity-70
                blur-[2px]
                animate-[float_8s_ease-in-out_infinite]
              "
            />

            {/* Animated Background Circle 2 */}
            <div
              className="
                absolute
                -bottom-24
                -left-24
                h-56
                w-56
                rounded-full
                bg-violet-100
                opacity-70
                animate-[float_8s_ease-in-out_infinite]
              "
            />

            {/* Brand */}
            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
                animate-[brandIn_0.8s_ease-out]
              "
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
                <div className="h-4 w-4 rotate-45 rounded-[5px] border-2 border-white" />
              </div>

              <span className="text-lg font-bold tracking-tight text-slate-900">
                SportsStiks
              </span>
            </div>

            {/* Main Content */}
            <div
              className="
                relative
                z-10
                mt-16
                md:mt-28
                max-w-md
                animate-[contentIn_0.8s_0.12s_both_ease-out]
              "
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                Operations workspace
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-[42px]">
                Keep every booking moving.
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                A focused workspace for teams managing sports bookings, venues
                and vendor operations from one place.
              </p>
            </div>

            {/* Floating Mini Dashboard */}
            <div
              className="
                absolute
                bottom-5
                right-5
                z-20
                w-52
                rounded-2xl
                border
                border-white/80
                bg-white/80
                p-4
                shadow-xl
                shadow-slate-300/30
                backdrop-blur-xl
                animate-[dashboardFloat_6s_ease-in-out_infinite]
                sm:w-56
                sm:bottom-7
                sm:right-7
                md:bottom-9
                md:right-8
                md:w-64
                md:p-5
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wide text-slate-500">
                  BOOKING ACTIVITY
                </span>

                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_5px_#dcfce7]" />
              </div>

              <div className="flex h-14 items-end gap-2">
                <div className="h-[35%] flex-1 rounded-t-md bg-indigo-200 animate-[barGrow_1s_ease-out]" />
                <div className="h-[58%] flex-1 rounded-t-md bg-indigo-200 animate-[barGrow_1s_0.1s_both_ease-out]" />
                <div className="h-[46%] flex-1 rounded-t-md bg-indigo-200 animate-[barGrow_1s_0.2s_both_ease-out]" />
                <div className="h-[78%] flex-1 rounded-t-md bg-indigo-300 animate-[barGrow_1s_0.3s_both_ease-out]" />
                <div className="h-[64%] flex-1 rounded-t-md bg-indigo-300 animate-[barGrow_1s_0.4s_both_ease-out]" />
                <div className="h-[90%] flex-1 rounded-t-md bg-indigo-400 animate-[barGrow_1s_0.5s_both_ease-out]" />
              </div>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="flex items-center bg-white px-6 py-10 sm:px-10 md:px-14">
            <div
              className="
                mx-auto
                w-full
                max-w-sm
                py-2
                animate-[formIn_0.75s_0.15s_both_ease-out]
              "
            >
              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to your workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={18}
                      className="
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={18}
                      className="
                        absolute
                        left-3.5
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        bg-white
                        pl-11
                        pr-12
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-slate-400
                        focus:border-indigo-500
                        focus:ring-4
                        focus:ring-indigo-500/10
                        focus:-translate-y-px
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="
                        absolute
                        right-2
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-400
                        transition-all
                        duration-200
                        hover:bg-slate-100
                        hover:text-slate-700
                        active:scale-90
                      "
                    >
                      {showPassword ? (
                        <FiEyeOff size={18} />
                      ) : (
                        <FiEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-linear-to-r
                      from-transparent
                      via-white/10
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-full
                    "
                  />

                  <span className="relative">Sign in</span>
                </button>
              </form>

              {/* Footer */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mt-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Demo Credentials
                </p>

                <div className="space-y-2">
                  <div className="rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-100">
                    <p className="mb-1 text-xs font-semibold text-slate-700">
                      Admin
                    </p>
                    <p className="text-xs text-slate-500">
                      admin@sportstik.com
                      <span className="mx-2 text-slate-300">|</span>
                      admin123
                    </p>
                  </div>

                  <div className="rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-100">
                    <p className="mb-1 text-xs font-semibold text-slate-700">
                      Support
                    </p>
                    <p className="text-xs text-slate-500">
                      support@sportstik.com
                      <span className="mx-2 text-slate-300">|</span>
                      support123
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center text-xs text-slate-400 md:mt-8">
                © 2026 SportsStiks. All rights reserved.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }

            50% {
              transform: translate(20px, 25px) scale(1.08);
            }
          }

          @keyframes brandIn {
            from {
              opacity: 0;
              transform: scale(0.7) rotate(-10deg);
            }

            to {
              opacity: 1;
              transform: scale(1) rotate(0);
            }
          }

          @keyframes contentIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes formIn {
            from {
              opacity: 0;
              transform: translateX(25px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes dashboardFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-9px);
            }
          }

          @keyframes barGrow {
            from {
              transform: scaleY(0);
              transform-origin: bottom;
            }

            to {
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
