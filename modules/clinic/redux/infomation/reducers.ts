import { PayloadAction } from "@reduxjs/toolkit";
import { Clinic, ClinicDetail } from "../model";
import { ClinicGrid } from "./model";

export const clinicReducers = {
	setClinicGrid: (state: Clinic, action: PayloadAction<ClinicGrid[]>) => {
		state.grid = action.payload;
	},
	setClinicDetail: (state: Clinic, action: PayloadAction<ClinicDetail>) => {
		state.clinicDetail = action.payload;
	},
};
