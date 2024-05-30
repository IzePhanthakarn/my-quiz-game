import { createSlice } from "@reduxjs/toolkit";
import { doctorReducers } from "./infomation/reducers";
import { modelDoctor } from "./model";

export const doctorSlice = createSlice({
  name: "Doctor",
  initialState: modelDoctor,
  reducers: {
    ...doctorReducers,
  },
});

export const actionsDoctor = doctorSlice.actions;

export const { setDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
