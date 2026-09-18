import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import bookingReducer from "./bookings/bookingSlice";
import vendorReducer from "./vendor/vendorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingReducer,
    vendors: vendorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;