import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5010Form, Med5010Grid } from "./model";

export const med5010Reducers = {
	setMed5010Form: (state: MedReport, action: PayloadAction<Med5010Form>) => {
		state.med5010.form = { ...action.payload };
	},
	setMed5010Grid: (state: MedReport, action: PayloadAction<Med5010Grid>) => {
		state.med5010.grid = action.payload;
	},
};
