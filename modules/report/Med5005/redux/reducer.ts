import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5005Form, Med5005Grid } from "./model";

export const med5005Reducers = {
	setMed5005Form: (state: MedReport, action: PayloadAction<Med5005Form>) => {
		state.med5005.form = { ...action.payload };
	},
	setMed5005Grid: (state: MedReport, action: PayloadAction<Med5005Grid>) => {
		state.med5005.grid = action.payload;
	},
};
