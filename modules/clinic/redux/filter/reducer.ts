import { PayloadAction } from "@reduxjs/toolkit";
import { Clinic } from "../model";
import { ClinicFilter } from "./model";

export const clinicFilterReducers = {
	setClinicFilter: (state: Clinic, action: PayloadAction<ClinicFilter>) => {
		state.clinicFilter = action.payload;
	},
};
