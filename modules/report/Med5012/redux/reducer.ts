import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5012Form, Med5012Grid, Med5012List } from "./model";

export const med5012Reducers = {
	setMed5012Form: (state: MedReport, action: PayloadAction<Med5012Form>) => {
		state.med5012.form = { ...action.payload };
	},
	setMed5012Grid: (state: MedReport, action: PayloadAction<Med5012Grid>) => {
		state.med5012.grid = action.payload;
		state.med5012.form.showDownload='Y';
	},

};
