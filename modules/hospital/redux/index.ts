import { createSlice } from "@reduxjs/toolkit";
import { modelHospital } from "./model";
import { hospitalReducers } from "./reducer";

export const hospitalSlice = createSlice({
	name: "Hospital",
	initialState: modelHospital,
	reducers: {
		...hospitalReducers,
	},
});

export const {
	setHospitalForm,
	setHospitalGrid,
	setHospitalFilter,
	setHospitalPagination,
	setExportPages,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
