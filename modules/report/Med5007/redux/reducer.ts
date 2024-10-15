import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5007Form, Med5007Grid } from "./model";

export const med5007Reducers = {
	setMed5007Form: (state: MedReport, action: PayloadAction<Med5007Form>) => {
		state.med5007.form = { ...action.payload };
	},
	setMed5007Grid: (state: MedReport, action: PayloadAction<Med5007Grid>) => {
		state.med5007.grid = action.payload;
		state.med5007.form.showDownload='Y';
	},
};
