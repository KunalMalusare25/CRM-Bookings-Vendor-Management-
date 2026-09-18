import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking, BookingStatus } from "../../data/bookings";
import { bookings } from "../../data/bookings";

interface BookingState {
  items: Booking[];
  loading: boolean;
}

const initialState: BookingState = {
  items: bookings,
  loading: false,
};

const bookingSlice = createSlice({
  name: "bookings",

  initialState,

  reducers: {
    // Add new booking
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.items.unshift(action.payload);
    },

    // Update booking status
    updateBookingStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: BookingStatus;
      }>,
    ) => {
      const booking = state.items.find((item) => item.id === action.payload.id);

      if (booking) {
        booking.status = action.payload.status;
      }
    },
  },
});

export const { addBooking, updateBookingStatus } = bookingSlice.actions;

export default bookingSlice.reducer;
