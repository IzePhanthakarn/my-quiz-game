import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5001Reducers } from "../Med5001/redux/reducer";
import { med5005Reducers } from "../Med5005/redux/reducer";
import { med5008Reducers } from "../Med5008/redux/reducer";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5010Reducers } from "../Med5010/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";
import { med5012Reducers } from "../Med5012/redux/reducer";
import { med5007Reducers } from "../Med5007/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5001Reducers,
		...med5005Reducers,
		...med5008Reducers,
		...med5009Reducers,
		...med5010Reducers,
		...med5011Reducers,
		...med5012Reducers,
		...med5007Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const {
	// MED5001
	setMed5001Form, 
	setMed5001List, 
	setMed5001TotalData,
	// MED5005
	setMed5005Form, 
	setMed5005List, 
	setMed5005TotalData,
	// MED5007
	setMed5007Form, 
	setMed5007List, 
	setMed5007TotalData,
	// MED5008
	setMed5008Form, 
	setMed5008List, 
	setMed5008TotalData,
	// MED5009
	setMed5009Form,
	setMed5009List,
	setMed5009TotalData,
	// MED5010
	setMed5010Form, 
	setMed5010List, 
	setMed5010TotalData,
	// MED5011
	setMed5011Form, 
	setMed5011List, 
	setMed5011TotalData,
	// MED5012
	setMed5012Form,
	setMed5012Grid,
} = medReportSlice.actions;

export default medReportSlice.reducer;

