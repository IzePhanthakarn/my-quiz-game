import { PayloadAction } from "@reduxjs/toolkit";
import { Diploma, DiplomaForm } from "../model";
import { DiplomaDetail } from "./model";

export const diplomaFormReducers = {
	setDiplomaDetail: (state: Diploma, action: PayloadAction<DiplomaDetail>) => {
		state.diplomaDetail = action.payload;
	},
};
