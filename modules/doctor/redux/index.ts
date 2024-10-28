import { createSlice } from "@reduxjs/toolkit";
import { doctorReducers } from "./master/reducers";
import { modelDoctor } from "./model";
import { doctorFilterReducers } from "./filter/reducers";
import { doctorFormReducers } from "./form/reducers";
import { doctorCompareHistoryReducers } from "./history/reducer";

export const doctorSlice = createSlice({
	name: "Doctor",
	initialState: modelDoctor,
	reducers: {
		...doctorReducers,
		...doctorFormReducers,
		...doctorFilterReducers,
		...doctorCompareHistoryReducers,
	},
});

export const actionsDoctor = doctorSlice.actions;

export const {
	setCompareAllParams,
	setCompareParams,
	setDoctorCompareList,
	setDoctorFilterList,
	setDoctorPostalList,
	setDoctorBankList,
	setTrainingList,
	setDoctorHospitalList,
	setDoctorDetailList,
	setDoctorData,
	setDoctorForm,
	setDoctorGrid,
	setDoctorFilter,
	setPagination,
	setOrder,
	setTotalData,
} = doctorSlice.actions;

export default doctorSlice.reducer;
