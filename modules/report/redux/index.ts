import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
		...med5011Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const { setMed5009Form, setMed5009List } = medReportSlice.actions;
export const { setMed5011Form, setMed5011List } = medReportSlice.actions;

export default medReportSlice.reducer;
