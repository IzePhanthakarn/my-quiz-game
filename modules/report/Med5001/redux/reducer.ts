import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5001Form, Med5001Grid } from "./model";

export const med5001Reducers = {
	setMed5001Form: (state: MedReport, action: PayloadAction<Med5001Form>) => {
		state.med5001.form = { ...action.payload };
	},
	setMed5001Grid: (state: MedReport, action: PayloadAction<Med5001Grid>) => {
		state.med5001.grid = action.payload;
		state.med5001.form.showDownload='Y';
	},
};
