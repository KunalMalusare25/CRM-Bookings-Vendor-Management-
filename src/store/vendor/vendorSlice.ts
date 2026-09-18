import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Vendor, VendorStatus } from "../../data/vendors";
import { vendors } from "../../data/vendors";

interface VendorState {
  items: Vendor[];
  loading: boolean;
}

const initialState: VendorState = {
  items: vendors,
  loading: false,
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    updateVendorStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: VendorStatus;
      }>,
    ) => {
      const vendor = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (vendor) {
        vendor.status = action.payload.status;
      }
    },
  },
});

export const { updateVendorStatus } = vendorSlice.actions;

export default vendorSlice.reducer;