import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";
import { med5005Reducers } from "../Med5005/redux/reducer";
import { med5010Reducers } from "../Med5010/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
		...med5011Reducers,
		...med5005Reducers,
		...med5010Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const { setMed5009Form, setMed5009List, setMed5009TotalData 
	           ,setMed5011Form, setMed5011List 
			   ,setMed5005Form, setMed5005List 
			   ,setMed5010Form, setMed5010List
             } = medReportSlice.actions;
export default medReportSlice.reducer;
