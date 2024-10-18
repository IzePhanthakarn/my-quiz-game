import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5003Form, Med5003Grid } from "./model";

export const med5003Reducers = {
	setMed5003Form: (state: MedReport, action: PayloadAction<Med5003Form>) => {
		state.med5003.form = { ...action.payload };
	},
	setMed5003Grid: (state: MedReport, action: PayloadAction<Med5003Grid>) => {
		state.med5003.grid = action.payload;
		state.med5003.form.showDownload='Y';
	},
};
