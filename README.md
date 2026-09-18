# Mini CRM Dashboard — Bookings & Vendor Management

A responsive internal CRM dashboard designed for marketplace/platform operations teams to manage **venue bookings and vendors** from a single interface.

The application provides role-based access for **Admin** and **Support** users, with local mock authentication and Redux Toolkit-based state management.

---

## 🚀 Project Overview
The goal was to build a simplified internal operations dashboard where users can:

* Authenticate using a mock login flow
* Monitor booking activity
* Search, sort and filter bookings
* View detailed booking information
* Update booking status based on role permissions
* Manage vendors
* Update vendor status
* View dashboard-level operational insights
* Switch between light and dark themes
* Access responsive layouts across desktop, tablet and mobile devices

The application is completely frontend-based and uses local mock data. No backend or external API is required.

---

# ✨ Features

## 1. Mock Authentication

* Email and password login
* Local mock authentication
* Authentication state managed using Redux Toolkit
* User session/token persisted in `localStorage`
* Automatic redirect after login
* Logout functionality
* Role-based navigation after authentication

### Supported Roles

| Role    | Access                              |
| ------- | ----------------------------------- |
| Admin   | Full access to bookings and vendors |
| Support | View-only access to bookings        |

---

# 📅 2. Bookings Management

The Bookings module provides an internal view of all venue bookings.

### Booking information

* Booking ID
* User name
* User email
* User phone
* Venue name
* Venue address
* City
* Sport
* Date
* Time slot
* Amount
* Booking status

### Booking functionality

* Search bookings
* Filter by status
* Filter by sport
* Sort booking amounts
* Pagination
* Booking detail drawer
* View customer information
* View venue information
* View booking schedule
* Update booking status

### Booking statuses

* Pending
* Confirmed
* Cancelled

---

# 🏟️ 3. Vendor Management

Admins can manage venue/vendor information from the Vendors module.

### Vendor information

* Vendor name
* City
* Vendor status
* Vendor details

### Vendor statuses

* Active
* Inactive
* Pending Verification

### Vendor functionality

* Vendor listing
* Vendor search/view functionality
* Vendor detail drawer
* Vendor status updates
* Role-based update permissions

Only Admin users can modify vendor information.

---

# 📊 4. Dashboard

The Admin dashboard provides a high-level operational overview.

### Dashboard metrics

* Total bookings
* Total revenue
* Active vendors
* Confirmed bookings
* Pending bookings
* Cancelled bookings

### Dashboard sections

* Booking activity
* Booking status distribution
* Recent bookings
* Operational summary

The dashboard is designed to help internal users quickly understand the current state of bookings and vendors without navigating through individual modules.

---

# 📤 5. Excel Report Export

An additional feature was implemented beyond the core requirements.

Admins can export operational data into an Excel workbook.

The exported workbook contains separate sheets for:

* Bookings
* Vendors

The report includes the complete available booking and vendor dataset.

Example filename:

```text
Sportstik_Report_YYYY-MM-DD.xlsx
```

This can be useful for:

* Offline analysis
* Internal reporting
* Data sharing
* Operational review

---

# 🌗 6. Light & Dark Theme

The application supports both:

* Light mode
* Dark mode

Theme preference is persisted locally so the selected theme can be retained between sessions.

The UI uses a consistent color system across:

* Sidebar
* Header
* Tables
* Cards
* Drawers
* Forms
* Status indicators
* Buttons

---

# 📱 7. Responsive Design

The dashboard is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The sidebar converts into a mobile navigation drawer and the layout adapts to smaller screen sizes.

The UI uses responsive Tailwind CSS utilities throughout the application.

---

# 🔐 8. Role-Based Access Control

RBAC is implemented on the frontend using the authenticated user's role.

### Permission matrix

| Feature               | Admin | Support |
| --------------------- | :---: | :-----: |
| Dashboard             |   ✅   |    ❌    |
| View Bookings         |   ✅   |    ✅    |
| Search Bookings       |   ✅   |    ✅    |
| Filter Bookings       |   ✅   |    ✅    |
| Sort Bookings         |   ✅   |    ✅    |
| View Booking Details  |   ✅   |    ✅    |
| Add Booking           |   ✅   |    ❌    |
| Update Booking Status |   ✅   |    ❌    |
| View Vendors          |   ✅   |    ❌    |
| Update Vendor Status  |   ✅   |    ❌    |
| Settings              |   ✅   |    ✅    |
| Help Center           |   ✅   |    ✅    |
| Export Reports        |   ✅   |    —    |

The UI hides actions that are not available to the current role.

---

# 🛠️ Tech Stack

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| React         | UI development                  |
| TypeScript    | Type safety                     |
| Vite          | Development/build tooling       |
| React Router  | Client-side routing             |
| Redux Toolkit | Global state management         |
| Tailwind CSS  | Styling and responsive UI       |
| Ant Design    | UI components where applicable  |
| Material UI   | UI components where applicable  |
| React Icons   | Interface icons                 |
| XLSX          | Excel report generation         |
| LocalStorage  | Mock authentication persistence |

---

# 🧠 Why These Technologies?

## React + TypeScript

React provides a component-based architecture suitable for building modular dashboard interfaces.

TypeScript was used to provide:

* Typed application state
* Typed component props
* Typed booking/vendor models
* Better development experience
* Reduced runtime errors

## Redux Toolkit

Redux Toolkit was selected because the application contains shared state across multiple modules.

For example:

```text
Auth
 └── Current user
 └── Role
 └── Authentication state

Bookings
 └── Booking list
 └── Booking status updates

Vendors
 └── Vendor list
 └── Vendor status updates
```

This keeps shared application state predictable and makes state updates easier to maintain.

## Tailwind CSS

Tailwind was used for:

* Responsive layouts
* Consistent spacing
* Theme styling
* Component states
* Rapid UI development

## React Router

React Router provides navigation between:

* Dashboard
* Bookings
* Vendors
* Settings
* Help Center
* Login

---

# 📁 Project Structure

```text
CRM-Bookings-Vendor-Management/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── bookings/
│   │   │   ├── AddBookingModal.tsx
│   │   │   └── Drawer.tsx
│   │   │
│   │   ├── common/
│   │   │   └── CustomTable.tsx
│   │   │
│   │   └── vendors/
│   │       └── VendorDetailsDrawer.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── data/
│   │   ├── bookings.ts
│   │   └── vendors.ts
│   │
│   ├── layouts/
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── pages/
│   │   ├── Bookings/
│   │   ├── Dashboard/
│   │   ├── HelpCenter/
│   │   ├── Login/
│   │   ├── Setting/
│   │   └── Vendors/
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── store/
│   │   ├── auth/
│   │   │   ├── auth.ts
│   │   │   └── authSlice.ts
│   │   ├── bookings/
│   │   │   └── bookingSlice.ts
│   │   ├── vendor/
│   │   │   └── vendorSlice.ts
│   │   └── store.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── utils.tsx
│
├── README.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

# 🏗️ Architecture

The project follows a simple component-based architecture.

```text
                 App
                  │
              AppRoutes
                  │
               Layout
          ┌───────┴────────┐
       Sidebar           Header
          │                 │
          └───────┬─────────┘
                  │
               Pages
          ┌───────┼─────────┐
      Dashboard Bookings Vendors
                  │
             Components
                  │
             Redux Store
          ┌───────┼─────────┐
         Auth   Bookings   Vendors
```

The structure intentionally avoids excessive abstraction because the application is a small-to-medium frontend assignment.

The goal was to keep the code:

* Easy to navigate
* Easy to review
* Easy to extend
* Separated by responsibility

---

# 🔄 State Management

Redux Toolkit manages shared application state.

### Store structure

```text
store
│
├── auth
│   └── authSlice
│
├── bookings
│   └── bookingSlice
│
└── vendors
    └── vendorSlice
```

### Authentication

The auth state contains:

```text
user
token
isAuthenticated
```

The authenticated user also contains the assigned role.

### Bookings

The booking slice manages:

* Booking collection
* Adding bookings
* Updating booking status

### Vendors

The vendor slice manages:

* Vendor collection
* Vendor status updates

---

# 🔑 Mock Authentication

No backend authentication is required for this assignment.

The login flow uses predefined mock users.

Example:

### Admin

```text
Email: admin@sportstik.com
Password: admin123
Role: Admin
```

### Support

```text
Email: support@sportstik.com
Password: support123
Role: Support
```

> These credentials are for demonstration purposes only and are not intended for production authentication.

After successful authentication, the user session is stored locally and the application redirects based on the user's role.

---

# 🧪 Mock Data

The application uses local TypeScript/JavaScript data files instead of a backend API.

```text
src/data/
├── bookings.ts
└── vendors.ts
```

This approach was selected because the assignment explicitly allows mocked data and does not require a backend.

The Redux slices initialize their state from the mock dataset and handle subsequent local updates.

---

# 🎨 UX & Product Decisions

The dashboard was designed around the workflow of an internal operations user.

### 1. Information at a glance

The dashboard displays key operational metrics such as booking volume, revenue and active vendors so users can understand the current state quickly.

### 2. Search and filtering

Bookings can be searched and filtered without navigating away from the page, reducing the number of steps needed to locate a specific booking.

### 3. Detail drawer

Booking and vendor details open in drawers rather than requiring a full-page navigation.

This allows users to inspect information while maintaining the context of the list they were working with.

### 4. Role-aware interface

Users only see actions relevant to their role.

For example, Support users can inspect bookings but do not see update actions.

### 5. Status-based visual language

Booking and vendor statuses use consistent visual indicators so operational states can be recognized quickly.

### 6. Responsive navigation

The sidebar becomes a mobile navigation drawer on smaller screens to maintain usability across devices.

---

# ⚡ Additional Enhancements

Beyond the minimum requirements, the following enhancements were included:

* Dashboard analytics
* Revenue summary
* Recent bookings section
* Booking status distribution
* Booking activity visualization
* Excel report export
* Light/dark theme
* Persistent theme preference
* Responsive mobile sidebar
* Responsive header
* User profile information
* Settings page
* Help Center page
* Mock RBAC-aware navigation
* Reusable table component
* Reusable detail drawer components
* Empty-state handling
* Local state persistence for authentication
* Consistent status styling

---

# ⚠️ Assumptions

Because there is no backend in this machine test, the following assumptions were made:

1. Authentication is mocked locally.
2. Booking and vendor data are static initial datasets.
3. Booking and vendor status changes are stored in frontend state.
4. Changes do not persist after a full browser refresh unless explicitly persisted.
5. User roles are predefined.
6. No real payment or booking transaction is performed.
7. No real vendor API is connected.
8. Excel export operates on the currently available local dataset.
9. Production-level authentication and authorization would be handled by a backend service.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm

Recommended:

```text
Node.js 18+
npm 9+
```

---

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the project:

```bash
cd CRM-Bookings-Vendor-Management
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL shown by Vite, typically:

```text
http://localhost:5173
```

---

# 📦 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# 🔍 Code Quality

The project uses TypeScript and ESLint to improve code quality and maintainability.

Before submission, it is recommended to run:

```bash
npm run lint
```

and:

```bash
npm run build
```

A successful build confirms that the application compiles correctly for production.

---

# 🗺️ Future Improvements

If this application were extended into a production CRM, the following improvements could be added:

### Backend & API

* REST/GraphQL API
* Real authentication
* JWT refresh tokens
* Backend RBAC enforcement
* Database persistence
* API error handling
* Request caching

### Data Management

* Server-side pagination
* Server-side filtering
* Server-side sorting
* Advanced booking search
* Vendor search
* Export API

### Real-Time Features

* WebSocket-based booking updates
* Real-time vendor status updates
* Live notification system
* Booking status notifications

### Testing

* Unit tests with Jest/Vitest
* React Testing Library
* Redux slice tests
* Component integration tests
* End-to-end tests with Playwright/Cypress

### Production Improvements

* Error boundaries
* Toast notification system
* Loading skeletons
* API retry handling
* Audit logs
* Permission configuration
* Analytics tracking
* Accessibility improvements
* Internationalization

---

# 📝 Product Note

This dashboard is designed to help internal marketplace operations teams manage bookings and vendors from a single workspace. The dashboard surfaces important operational metrics first, allowing users to understand booking volume, revenue and vendor activity quickly. The bookings table provides search, filtering, sorting and pagination so users can efficiently locate operational records. Detail drawers keep users within the current workflow while allowing them to inspect booking or vendor information. Role-based access ensures that Support users can assist customers without receiving administrative update permissions. The responsive layout also allows the dashboard to remain usable across different screen sizes.

---

# 👨‍💻 Developer Notes

This project was intentionally kept simple and modular for the machine-test scope.

The architecture is designed so that mocked data can later be replaced with API services without requiring major changes to the UI components.

For example:

```text
Current

Component
   ↓
Redux
   ↓
Mock Data


Production-ready direction

Component
   ↓
Redux
   ↓
API Service
   ↓
Backend
   ↓
Database
```

This separation makes the current implementation suitable as a frontend prototype while providing a clear path toward a production architecture.

---

# 📌 Assignment Coverage

| Requirement          | Status |
| -------------------- | :----: |
| Mock Login           |    ✅   |
| Email + Password     |    ✅   |
| Local Authentication |    ✅   |
| Token Persistence    |    ✅   |
| Bookings Table       |    ✅   |
| Sorting              |    ✅   |
| Status Filtering     |    ✅   |
| Sport Filtering      |    ✅   |
| Pagination           |    ✅   |
| Booking Detail       |    ✅   |
| Cancel Booking       |    ✅   |
| Mark as Confirmed    |    ✅   |
| Vendor Listing       |    ✅   |
| Vendor Detail        |    ✅   |
| Vendor Status Update |    ✅   |
| Admin Role           |    ✅   |
| Support Role         |    ✅   |
| RBAC                 |    ✅   |
| Responsive UI        |    ✅   |
| TypeScript           |    ✅   |
| Redux Toolkit        |    ✅   |
| React Router         |    ✅   |
| Mock Data            |    ✅   |
| Light/Dark Theme     |    ✅   |
| Dashboard Analytics  |    ✅   |
| Excel Export         |    ✅   |
| Help Center          |    ✅   |
| Settings             |    ✅   |

---

## 📄 License

This project was created as part of a frontend engineering machine test.
