import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5011Form, Med5011List } from "./model";

export const med5011Reducers = {
	setMed5011Form: (state: MedReport, action: PayloadAction<Med5011Form>) => {
		state.med5011.form = { ...action.payload };
	},
	setMed5011List: (state: MedReport, action: PayloadAction<Med5011List[]>) => {
		state.med5011.list = action.payload;
	},
};
