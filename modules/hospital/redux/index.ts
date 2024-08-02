import { createSlice } from "@reduxjs/toolkit";
import { modelHospital } from "./model";
import { hospitalReducers } from "./reducer";

export const hospitalSlice = createSlice({
  name: "Clinic",
  initialState: modelHospital,
  reducers: {
    ...hospitalReducers,
  },
});

export const {
  setHospitalForm,
  setHospitalGrid,
  setHospitalFilter,
  setHospitalPagination,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
