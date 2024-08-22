import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorData, DoctorDetailList, DoctorForm } from "./model";

export const doctorFormReducers = {
	setDoctorForm: (state: Doctor, action: PayloadAction<DoctorForm>) => {
		state.doctorForm = { ...action.payload };
	},
	setDoctorData: (state: Doctor, action: PayloadAction<DoctorData>) => {
		state.doctorForm.doctorData = { ...action.payload };
	},
	setDoctorDetailList: (
		state: Doctor,
		action: PayloadAction<DoctorDetailList[]>
	) => {
		state.doctorForm.doctorDetail = action.payload;
	},
};
