import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorData, DoctorForm } from "./model";

export const doctorFormReducers = {
	setDoctorForm: (state: Doctor, action: PayloadAction<DoctorForm>) => {
		state.doctorForm = { ...action.payload };
	},
	setDoctorData: (state: Doctor, action: PayloadAction<DoctorData>) => {
		state.doctorForm.doctor = { ...action.payload };
	},
};
