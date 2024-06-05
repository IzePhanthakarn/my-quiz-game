import { PayloadAction } from "@reduxjs/toolkit";
import { FilterForm } from "./model";
import { BaseDrawer } from "../../../redux/model";

export const filterFormReducers = {
  setFilterForm: (state: BaseDrawer, action: PayloadAction<FilterForm>) => {
    state.filterForm = { ...action.payload };
  },
};
