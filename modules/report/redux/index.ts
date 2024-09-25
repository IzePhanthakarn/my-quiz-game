import { createSlice } from "@reduxjs/toolkit";
import { modelMedReport } from "./model";
import { med5009Reducers } from "../Med5009/redux/reducer";
import { med5011Reducers } from "../Med5011/redux/reducer";
import { med5005Reducers } from "../Med5005/redux/reducer";
import { med5010Reducers } from "../Med5010/redux/reducer";
import { med5001Reducers } from "../Med5001/redux/reducer";

export const medReportSlice = createSlice({
	name: "MedReport",
	initialState: modelMedReport,
	reducers: {
		...med5009Reducers,
		...med5011Reducers,
		...med5005Reducers,
		...med5010Reducers,
		...med5001Reducers,
	},
});

export const actionsMedReport = medReportSlice.actions;

export const { setMed5009Form, setMed5009List, setMed5009TotalData 
	           ,setMed5011Form, setMed5011List, setMed5011TotalData  
			   ,setMed5005Form, setMed5005List, setMed5005TotalData  
			   ,setMed5010Form, setMed5010List, setMed5010TotalData  
			   ,setMed5001Form, setMed5001List, setMed5001TotalData  
             } = medReportSlice.actions;
export default medReportSlice.reducer;
