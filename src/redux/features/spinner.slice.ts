// src/redux/slices/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface SpinnerState {
  loading: boolean;
}

const initialState: SpinnerState = { loading: false };

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.loading = true;
    },
    hideSpinner: (state) => {
      state.loading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
