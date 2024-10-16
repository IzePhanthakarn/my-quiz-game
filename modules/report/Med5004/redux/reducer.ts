import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5004Form, Med5004Grid } from "./model";

export const med5004Reducers = {
	setMed5004Form: (state: MedReport, action: PayloadAction<Med5004Form>) => {
		state.med5004.form = { ...action.payload };
	},
	setMed5004Grid: (state: MedReport, action: PayloadAction<Med5004Grid>) => {
		state.med5004.grid = action.payload;
		state.med5004.form.showDownload='Y';
	},
};
