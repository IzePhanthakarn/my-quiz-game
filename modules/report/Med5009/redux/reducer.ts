import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5009Form, Med5009List } from "./model";

export const med5009Reducers = {
	setMed5009Form: (state: MedReport, action: PayloadAction<Med5009Form>) => {
		state.med5009.form = { ...action.payload };
	},
	setMed5009List: (state: MedReport, action: PayloadAction<Med5009List[]>) => {
		state.med5009.list = action.payload;
	},
};
