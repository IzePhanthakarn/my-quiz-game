import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5013Form, Med5013Grid } from "./model";

export const med5013Reducers = {
	setMed5013Form: (state: MedReport, action: PayloadAction<Med5013Form>) => {
		state.med5013.form = { ...action.payload };
	},
	setMed5013Grid: (state: MedReport, action: PayloadAction<Med5013Grid>) => {
		state.med5013.grid = action.payload;
		state.med5013.form.showDownload='Y';
	},
};
