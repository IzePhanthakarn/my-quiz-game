import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5001Reducers } from "../Med5001/redux/reducer";
import { med5002Reducers } from "../Med5002/redux/reducer";
import { med5003Reducers } from "../Med5003/redux/reducer";
import { med5004Reducers } from "../Med5004/redux/reducer";
import { med5005Reducers } from "../Med5005/redux/reducer";

import { med5007Reducers } from "../Med5007/redux/reducer";
import { med5008Reducers } from "../Med5008/redux/reducer";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5010Reducers } from "../Med5010/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";
import { med5012Reducers } from "../Med5012/redux/reducer";
import { med5013Reducers } from "../Med5013/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5001Reducers,
		...med5002Reducers,
		...med5003Reducers,
		...med5004Reducers,
		...med5005Reducers,
		
		...med5007Reducers,
		...med5008Reducers,
		...med5009Reducers,
		...med5010Reducers,
		...med5011Reducers,
		...med5012Reducers,
		...med5013Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const {
	// MED5001
	setMed5001Form,
	setMed5001Grid,
	// MED5002
	setMed5002Form,
	setMed5002Grid,
	// MED5003
	setMed5003Form,
	setMed5003Grid,
	// MED5004
	setMed5004Form,
	setMed5004Grid,
	// MED5005
	setMed5005Form,
	setMed5005Grid,
	// MED5007
	setMed5007Form,
	setMed5007Grid,
	// MED5008
	setMed5008Form,
	setMed5008Grid,
	// MED5009
	setMed5009Form,
	setMed5009List,
	setMed5009TotalData,
	// MED5010
	setMed5010Form,
	setMed5010Grid,
	// MED5011
	setMed5011Form,
	setMed5011Grid,
	// MED5012
	setMed5012Form,
	setMed5012Grid,
	// MED5013
	setMed5013Form,
	setMed5013Grid,
} = medReportSlice.actions;
export default medReportSlice.reducer;
