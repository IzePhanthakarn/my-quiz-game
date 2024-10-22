import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5002Form, Med5002Grid } from "./model";

export const med5002Reducers = {
	setMed5002Form: (state: MedReport, action: PayloadAction<Med5002Form>) => {
		state.med5002.form = { ...action.payload };
	},
	setMed5002Grid: (state: MedReport, action: PayloadAction<Med5002Grid>) => {
		state.med5002.grid = action.payload;
		state.med5002.form.showDownload='Y';
	},
};
