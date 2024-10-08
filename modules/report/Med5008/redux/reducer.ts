import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5008Form, Med5008Grid } from "./model";

export const med5008Reducers = {
	setMed5008Form: (state: MedReport, action: PayloadAction<Med5008Form>) => {
		state.med5008.form = { ...action.payload };
	},
	setMed5008Grid: (state: MedReport, action: PayloadAction<Med5008Grid>) => {
		state.med5008.grid = action.payload;
	},
};
