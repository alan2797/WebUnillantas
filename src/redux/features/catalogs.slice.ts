
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
};

const catalogsSlice = createSlice({
  name: "catalogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const {} = catalogsSlice.actions;
export default catalogsSlice.reducer;
