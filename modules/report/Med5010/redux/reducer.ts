import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5010Form, Med5010List } from "./model";

export const med5010Reducers = {
	setMed5010Form: (state: MedReport, action: PayloadAction<Med5010Form>) => {
		state.med5010.form = { ...action.payload };
	},
	setMed5010List: (state: MedReport, action: PayloadAction<Med5010List[]>) => {
		state.med5010.grid.list = action.payload;
	},setMed5010TotalData: (state: MedReport, action: PayloadAction<number>) => {
		state.med5010.grid.page.totalData = action.payload;
	},
};
