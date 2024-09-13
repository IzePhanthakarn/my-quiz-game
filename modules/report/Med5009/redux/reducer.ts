import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5009Form } from "./model";

export const med5009Reducers = {
	setMed5009Form: (state: MedReport, action: PayloadAction<Med5009Form>) => {
		console.log("...action.payload", { ...action.payload });
		state.med5009.form = { ...action.payload };
	},
};
