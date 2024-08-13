import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorForm } from "./model";

export const doctorFormReducers = {
	setDoctorForm: (state: Doctor, action: PayloadAction<DoctorForm>) => {
		state.doctorForm = { ...action.payload };
	},
};
