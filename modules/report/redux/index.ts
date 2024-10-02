import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5012Reducers } from "../Med5012/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
		...med5012Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const {
	// MED5009
	setMed5009Form,
	setMed5009List,
	setMed5009TotalData,
	// MED5012
	setMed5012Form,
	setMed5012Grid,
} = medReportSlice.actions;

export default medReportSlice.reducer;
