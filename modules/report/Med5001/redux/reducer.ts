import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5001Form, Med5001List } from "./model";

export const med5001Reducers = {
	setMed5001Form: (state: MedReport, action: PayloadAction<Med5001Form>) => {
		state.med5001.form = { ...action.payload };
	},
	setMed5001List: (state: MedReport, action: PayloadAction<Med5001List[]>) => {
		state.med5001.grid.list = action.payload;
	},setMed5001TotalData: (state: MedReport, action: PayloadAction<number>) => {
		state.med5001.grid.page.totalData = action.payload;
	},
};
