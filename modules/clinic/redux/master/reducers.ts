import { PayloadAction } from "@reduxjs/toolkit";
import { Clinic } from "../model";
import { ClinicGrid } from "./model";

export const clinicReducers = {
  setClinicGrid: (state: Clinic, action: PayloadAction<ClinicGrid[]>) => {
    state.grid = action.payload;
  },
};
