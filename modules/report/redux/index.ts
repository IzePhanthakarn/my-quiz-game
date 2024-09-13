import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const { setMed5009Form } = medReportSlice.actions;

export default medReportSlice.reducer;
