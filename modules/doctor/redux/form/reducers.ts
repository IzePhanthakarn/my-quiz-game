import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import {
	DoctorData,
	DoctorDetailList,
	DoctorForm,
	DoctorHospitalList,
	TrainingList,
} from "./model";

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
	setDoctorHospitalList: (
		state: Doctor,
		action: PayloadAction<DoctorHospitalList[]>
	) => {
		state.doctorForm.doctorHospital = action.payload;
	},

	setTrainingList: (state: Doctor, action: PayloadAction<TrainingList[]>) => {
		state.doctorForm.training = action.payload;
	},
};
