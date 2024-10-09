import { PayloadAction } from "@reduxjs/toolkit";
import { MedReport } from "../../redux/model";
import { Med5011Form, Med5011Grid } from "./model";

export const med5011Reducers = {
	setMed5011Form: (state: MedReport, action: PayloadAction<Med5011Form>) => {
		state.med5011.form = { ...action.payload };
		console.log("state.med5011.form.DownloadType="+state.med5011.form.downloadType);
	},
	setMed5011Grid: (state: MedReport, action: PayloadAction<Med5011Grid>) => {
		state.med5011.grid = action.payload;
		state.med5011.form.showDownload='Y';
	},
};
