import { createSlice } from "@reduxjs/toolkit";
import { clinicReducers } from "./infomation/reducers";
import { modelClinic } from "./model";

export const clinicSlice = createSlice({
  name: "Clinic",
  initialState: modelClinic,
  reducers: {
    ...clinicReducers,
  },
});

export const { setClinic } = clinicSlice.actions;

export default clinicSlice.reducer;
