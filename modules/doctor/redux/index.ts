import { createSlice } from "@reduxjs/toolkit";
import { doctorReducers } from "./master/reducers";
import { modelDoctor } from "./model";
import { doctorFilterReducers } from "./filter/reducers";
import { doctorFormReducers } from "./form/reducers";

export const doctorSlice = createSlice({
	name: "Doctor",
	initialState: modelDoctor,
	reducers: {
		...doctorReducers,
		...doctorFormReducers,
		...doctorFilterReducers,
	},
});

export const actionsDoctor = doctorSlice.actions;

export const {
	setDoctorForm,
	setDoctorGrid,
	setDoctorFilter,
	setPagination,
	setOrder,
	setTotalData,
} = doctorSlice.actions;

export default doctorSlice.reducer;
