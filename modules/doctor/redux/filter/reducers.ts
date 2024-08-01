import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorFilter } from "./model";

export const doctorFilterReducers = {
	setDoctorFilter: (state: Doctor, action: PayloadAction<DoctorFilter>) => {
		state.doctorFilter = action.payload;
	},
};
