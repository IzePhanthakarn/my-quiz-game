import { createSlice } from "@reduxjs/toolkit";
import { clinicReducers } from "./master/reducers";
import { modelClinic } from "./model";

export const clinicSlice = createSlice({
  name: "Clinic",
  initialState: modelClinic,
  reducers: {
    ...clinicReducers,
  },
});

export const { setClinicGrid } = clinicSlice.actions;

export default clinicSlice.reducer;
