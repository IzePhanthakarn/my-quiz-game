import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5005Form, Med5005List } from "./model";

export const med5005Reducers = {
	setMed5005Form: (state: MedReport, action: PayloadAction<Med5005Form>) => {
		state.med5005.form = { ...action.payload };
	},
	setMed5005List: (state: MedReport, action: PayloadAction<Med5005List[]>) => {
		state.med5005.list = action.payload;
	},setMed5005TotalData: (state: MedReport, action: PayloadAction<number>) => {
		state.med5005.grid.page.totalData = action.payload;
	},
};
