import { createSlice } from "@reduxjs/toolkit";
import { modelMedicalAmount } from "./model";
import { medicalAmountReducers } from "./reducer";

export const medicalAmountSlice = createSlice({
	name: "Clinic",
	initialState: modelMedicalAmount,
	reducers: {
		...medicalAmountReducers,
	},
});

export const {
	setMedicalAmountForm,
	setMedicalAmountGrid,
	setMedicalAmountFilter,
	setMedicalAmountPagination,
} = medicalAmountSlice.actions;

export default medicalAmountSlice.reducer;
