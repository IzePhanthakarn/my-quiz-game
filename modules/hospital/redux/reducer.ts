import { PayloadAction } from "@reduxjs/toolkit";
import { HospitalForm, HospitalGrid, HospitalFilter, Hospital } from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const hospitalReducers = {
  setHospitalGrid: (state: Hospital, action: PayloadAction<HospitalGrid>) => {
    state.grid = action.payload;
  },
  setHospitalFilter: (
    state: Hospital,
    action: PayloadAction<HospitalFilter>
  ) => {
    state.filter = action.payload;
  },
  setHospitalForm: (state: Hospital, action: PayloadAction<HospitalForm>) => {
    state.form = action.payload;
  },
  setHospitalPagination: (
    state: Hospital,
    action: PayloadAction<PaginationOptions>
  ) => {
    state.grid.page = { ...action.payload };
  },
};
