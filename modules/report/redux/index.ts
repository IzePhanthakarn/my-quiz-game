import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5001Reducers } from "../Med5001/redux/reducer";
import { med5005Reducers } from "../Med5005/redux/reducer";
import { med5008Reducers } from "../Med5008/redux/reducer";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5010Reducers } from "../Med5010/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";
import { med5012Reducers } from "../Med5012/redux/reducer";

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
	},
});

export const actionsMedReport = medReportSlice.actions;

export const {  setMed5001Form, setMed5001Grid 
               ,setMed5005Form, setMed5005Grid 
			   ,setMed5008Form, setMed5008Grid    
	           ,setMed5009Form, setMed5009List, setMed5009TotalData 
			   ,setMed5010Form, setMed5010Grid
	           ,setMed5011Form, setMed5011Grid
			   ,setMed5012Form,setMed5012Grid
             } = medReportSlice.actions
			 
export default medReportSlice.reducer;
