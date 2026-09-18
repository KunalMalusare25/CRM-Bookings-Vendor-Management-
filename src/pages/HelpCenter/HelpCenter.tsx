import { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const HelpCenter = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using the CRM dashboard.",
      icon: FiBookOpen,
      color: isDark
        ? "bg-violet-500/10 text-violet-400"
        : "bg-violet-50 text-violet-600",
    },
    {
      title: "Bookings",
      description: "Manage bookings, statuses and booking details.",
      icon: FiHelpCircle,
      color: isDark
        ? "bg-emerald-500/10 text-emerald-400"
        : "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Vendors",
      description: "Manage vendors and update their status.",
      icon: FiUsers,
      color: isDark
        ? "bg-orange-500/10 text-orange-400"
        : "bg-orange-50 text-orange-600",
    },
    {
      title: "Account & Settings",
      description: "Manage your profile and account preferences.",
      icon: FiSettings,
      color: isDark
        ? "bg-sky-500/10 text-sky-400"
        : "bg-sky-50 text-sky-600",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      category: "Bookings",
      question: "How do I create a new booking?",
      answer:
        "Go to the Bookings page and click the Add Booking button. Enter the required user, venue, sport, date, slot and amount details, then save the booking.",
    },
    {
      id: 2,
      category: "Bookings",
      question: "How can I change a booking status?",
      answer:
        "Open a booking from the Bookings table to view its details. From the booking details panel, you can change the status to Confirmed or Cancelled.",
    },
    {
      id: 3,
      category: "Bookings",
      question: "Can I search for a specific booking?",
      answer:
        "Yes. Use the search field on the Bookings page. You can search by booking ID, user name, email, venue, city or sport.",
    },
    {
      id: 4,
      category: "Bookings",
      question: "How do I filter bookings?",
      answer:
        "You can filter bookings using the Status and Sport filters available at the top of the Bookings page.",
    },
    {
      id: 5,
      category: "Vendors",
      question: "How do I view vendor details?",
      answer:
        "Go to the Vendors page and click on any vendor row. A vendor details panel will open with the vendor's information and current status.",
    },
    {
      id: 6,
      category: "Vendors",
      question: "How can I update a vendor status?",
      answer:
        "Open the vendor details panel, select the required status and save the change. The vendor status will be updated in the dashboard.",
    },
    {
      id: 7,
      category: "Account & Settings",
      question: "How do I update my account information?",
      answer:
        "Open the Settings page from the sidebar. You can update your available profile and account preferences from there.",
    },
    {
      id: 8,
      category: "Getting Started",
      question: "What can I manage from the dashboard?",
      answer:
        "The dashboard provides an overview of bookings, revenue and active vendors. You can also manage bookings and vendors from their respective sections.",
    },
  ];

  const filteredFAQs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchValue) ||
        faq.answer.toLowerCase().includes(searchValue) ||
        faq.category.toLowerCase().includes(searchValue),
    );
  }, [search]);

  const toggleFAQ = (id: number) => {
    setOpenFAQ((previous) => (previous === id ? null : id));
  };

  return (
    <div
      className={`
        min-h-full px-4 py-6 transition-colors
        sm:px-6 lg:px-8
        ${isDark ? "bg-slate-950" : "bg-slate-50"}
      `}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p
            className={`mb-2 text-sm font-medium ${
              isDark ? "text-violet-400" : "text-violet-600"
            }`}
          >
            Support Center
          </p>

          <h1
            className={`
              text-2xl font-bold tracking-tight sm:text-3xl
              ${isDark ? "text-white" : "text-slate-900"}
            `}
          >
            How can we help?
          </h1>

          <p
            className={`
              mt-2 max-w-2xl text-sm sm:text-base
              ${isDark ? "text-slate-400" : "text-slate-500"}
            `}
          >
            Find answers, explore helpful guides or get in touch with our
            support team.
          </p>
        </div>

        {/* Search Section */}
        <div
          className={`
            mb-8 overflow-hidden rounded-2xl p-6 shadow-sm sm:p-8
            ${isDark ? "bg-slate-900" : "bg-slate-900"}
          `}
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              <FiHelpCircle size={24} />
            </div>

            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Search our help center
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Search for answers to common questions about bookings, vendors
              and your account.
            </p>

            <div className="relative mt-6">
              <FiSearch
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for help..."
                className="
                  h-13 w-full rounded-xl
                  border border-white/10
                  bg-white
                  px-12 pr-4
                  text-sm text-slate-900
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-violet-400
                  focus:ring-4
                  focus:ring-violet-400/20
                "
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        {!search.trim() && (
          <section className="mb-10">
            <div className="mb-5">
              <h2
                className={`
                  text-lg font-semibold
                  ${isDark ? "text-white" : "text-slate-900"}
                `}
              >
                Browse by category
              </h2>

              <p
                className={`
                  mt-1 text-sm
                  ${isDark ? "text-slate-400" : "text-slate-500"}
                `}
              >
                Find the information you need quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <div
                    key={category.title}
                    className={`
                      group cursor-pointer rounded-2xl
                      border p-5 shadow-sm
                      transition duration-200
                      hover:-translate-y-1
                      hover:shadow-md
                      ${
                        isDark
                          ? "border-slate-800 bg-slate-900 hover:border-slate-700"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }
                    `}
                  >
                    <div
                      className={`
                        mb-4 flex h-11 w-11
                        items-center justify-center
                        rounded-xl
                        ${category.color}
                      `}
                    >
                      <Icon size={21} />
                    </div>

                    <h3
                      className={`
                        font-semibold
                        ${isDark ? "text-white" : "text-slate-900"}
                      `}
                    >
                      {category.title}
                    </h3>

                    <p
                      className={`
                        mt-2 text-sm leading-6
                        ${isDark ? "text-slate-400" : "text-slate-500"}
                      `}
                    >
                      {category.description}
                    </p>

                    <div
                      className={`
                        mt-4 text-sm font-medium transition
                        ${
                          isDark
                            ? "text-violet-400 group-hover:text-violet-300"
                            : "text-violet-600 group-hover:text-violet-700"
                        }
                      `}
                    >
                      View articles →
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <div className="mb-5">
            <h2
              className={`
                text-lg font-semibold
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              {search.trim() ? "Search results" : "Frequently asked questions"}
            </h2>

            <p
              className={`
                mt-1 text-sm
                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              {search.trim()
                ? `${filteredFAQs.length} result${
                    filteredFAQs.length !== 1 ? "s" : ""
                  } found`
                : "Quick answers to common questions."}
            </p>
          </div>

          <div
            className={`
              overflow-hidden rounded-2xl border shadow-sm
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            {filteredFAQs.length > 0 ? (
              <div
                className={`
                  divide-y
                  ${isDark ? "divide-slate-800" : "divide-slate-100"}
                `}
              >
                {filteredFAQs.map((faq) => {
                  const isOpen = openFAQ === faq.id;

                  return (
                    <div key={faq.id}>
                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        className={`
                          flex w-full items-center justify-between
                          gap-4 px-5 py-5 text-left transition
                          sm:px-6
                          ${
                            isDark
                              ? "hover:bg-slate-800/60"
                              : "hover:bg-slate-50"
                          }
                        `}
                      >
                        <div className="min-w-0">
                          <div className="mb-2">
                            <span
                              className={`
                                rounded-full px-2.5 py-1
                                text-xs font-medium
                                ${
                                  isDark
                                    ? "bg-slate-800 text-slate-400"
                                    : "bg-slate-100 text-slate-600"
                                }
                              `}
                            >
                              {faq.category}
                            </span>
                          </div>

                          <h3
                            className={`
                              text-sm font-semibold sm:text-base
                              ${
                                isDark
                                  ? "text-slate-100"
                                  : "text-slate-900"
                              }
                            `}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        <div
                          className={`
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg
                            ${
                              isDark
                                ? "bg-slate-800 text-slate-400"
                                : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >
                          {isOpen ? (
                            <FiChevronUp size={17} />
                          ) : (
                            <FiChevronDown size={17} />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <div
                            className={`
                              rounded-xl px-4 py-4
                              text-sm leading-6
                              ${
                                isDark
                                  ? "bg-slate-800/70 text-slate-300"
                                  : "bg-slate-50 text-slate-600"
                              }
                            `}
                          >
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div
                  className={`
                    mb-4 flex h-14 w-14
                    items-center justify-center
                    rounded-full
                    ${
                      isDark
                        ? "bg-slate-800 text-slate-500"
                        : "bg-slate-100 text-slate-400"
                    }
                  `}
                >
                  <FiSearch size={24} />
                </div>

                <h3
                  className={`
                    text-base font-semibold
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  No results found
                </h3>

                <p
                  className={`
                    mt-2 max-w-md text-sm
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  We couldn't find anything matching "{search}". Try using
                  different keywords.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className={`
                    mt-5 rounded-lg px-4 py-2.5
                    text-sm font-medium text-white
                    transition
                    ${
                      isDark
                        ? "bg-violet-600 hover:bg-violet-500"
                        : "bg-slate-900 hover:bg-slate-800"
                    }
                  `}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-8">
          <div
            className={`
              rounded-2xl border p-6 shadow-sm sm:p-8
              ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div
                  className={`
                    mb-3 flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    ${
                      isDark
                        ? "bg-violet-500/10 text-violet-400"
                        : "bg-violet-50 text-violet-600"
                    }
                  `}
                >
                  <FiMessageCircle size={21} />
                </div>

                <h2
                  className={`
                    text-lg font-semibold
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  Still need help?
                </h2>

                <p
                  className={`
                    mt-1 max-w-xl text-sm leading-6
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Can't find what you're looking for? Contact our support team
                  and we'll help you with your issue.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "mailto:support@example.com?subject=CRM Support Request";
                }}
                className={`
                  inline-flex shrink-0 items-center
                  justify-center gap-2 rounded-xl
                  px-5 py-3 text-sm font-semibold
                  text-white transition
                  ${
                    isDark
                      ? "bg-violet-600 hover:bg-violet-500"
                      : "bg-slate-900 hover:bg-slate-800"
                  }
                `}
              >
                <FiMail size={17} />
                Contact Support
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div
          className={`
            py-8 text-center text-xs
            ${isDark ? "text-slate-600" : "text-slate-400"}
          `}
        >
          <p>Need more assistance? Our support team is here to help.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;