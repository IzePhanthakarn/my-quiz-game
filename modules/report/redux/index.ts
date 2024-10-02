import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5012Reducers } from "../Med5012/redux/reducer";
import { med5007Reducers } from "../Med5007/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
		...med5012Reducers,
		...med5007Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const {
	// MED5007
	setMed5007Form, 
	setMed5007List, 
	setMed5007TotalData,
	// MED5009
	setMed5009Form,
	setMed5009List,
	setMed5009TotalData,
	// MED5012
	setMed5012Form,
	setMed5012Grid,
} = medReportSlice.actions;

export default medReportSlice.reducer;

