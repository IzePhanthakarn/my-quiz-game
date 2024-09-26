import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5007Form, Med5007List } from "./model";

export const med5007Reducers = {
	setMed5007Form: (state: MedReport, action: PayloadAction<Med5007Form>) => {
		state.med5007.form = { ...action.payload };
	},
	setMed5007List: (state: MedReport, action: PayloadAction<Med5007List[]>) => {
		state.med5007.grid.list = action.payload;
	},
	setMed5007TotalData: (state: MedReport, action: PayloadAction<number>) => {
		state.med5007.grid.page.totalData = action.payload;
	},
};
