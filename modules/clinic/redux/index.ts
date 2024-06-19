import { createSlice } from "@reduxjs/toolkit";
import { clinicReducers } from "./master/reducers";
import { modelClinic } from "./model";
import { clinicFilterReducers } from "./filter/reducer";

export const clinicSlice = createSlice({
	name: "Clinic",
	initialState: modelClinic,
	reducers: {
		...clinicReducers,
		...clinicFilterReducers,
	},
});

export const {
	setClinicGrid,
	setClinicDetail,
	setClinicFilter,
	setPagination,
	setTotalData,
	setClinicDetailError,
	setOrder,
} = clinicSlice.actions;

export default clinicSlice.reducer;
