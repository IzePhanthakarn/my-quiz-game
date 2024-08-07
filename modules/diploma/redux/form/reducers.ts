import { PayloadAction } from "@reduxjs/toolkit";
import { Diploma, DiplomaForm } from "../model";

export const diplomaFormReducers = {
	setDiplomaDetail: (state: Diploma, action: PayloadAction<DiplomaForm>) => {
		state.diplomaDetail = action.payload;
	},
};
