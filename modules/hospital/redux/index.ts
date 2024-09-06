import { createSlice } from "@reduxjs/toolkit";
import { modelHospital } from "./models/hospitalModel";
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
	setHospitalSp7Grid,
	setHospitalSp19Grid,
	setHospitalEtcFilesGrid,
	setHospitalAttachmentGrid,
} = hospitalSlice.actions;

export default hospitalSlice.reducer;
