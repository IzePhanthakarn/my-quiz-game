import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5008Form, Med5008List } from "./model";

export const med5008Reducers = {
	setMed5008Form: (state: MedReport, action: PayloadAction<Med5008Form>) => {
		state.med5008.form = { ...action.payload };
	},
	setMed5008List: (state: MedReport, action: PayloadAction<Med5008List[]>) => {
		state.med5008.grid.list = action.payload;
	},setMed5008TotalData: (state: MedReport, action: PayloadAction<number>) => {
		state.med5008.grid.page.totalData = action.payload;
	},
};
