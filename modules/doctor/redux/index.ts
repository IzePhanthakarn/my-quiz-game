import { createSlice } from "@reduxjs/toolkit";
import { doctorReducers } from "./master/reducers";
import { modelDoctor } from "./model";
import { doctorFilterReducers } from "./filter/reducers";

export const doctorSlice = createSlice({
	name: "Doctor",
	initialState: modelDoctor,
	reducers: {
		...doctorReducers,
		...doctorFilterReducers,
	},
});

export const actionsDoctor = doctorSlice.actions;

export const {
	setDoctorGrid,
	setDoctorFilter,
	setPagination,
	setOrder,
	setTotalData,
} = doctorSlice.actions;

export default doctorSlice.reducer;
