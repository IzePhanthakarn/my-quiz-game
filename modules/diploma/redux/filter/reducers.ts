import { PayloadAction } from "@reduxjs/toolkit";
import { Diploma } from "../model";
import { DiplomaFilter } from "./model";

export const diplomaFilterReducers = {
	setDiplomaFilter: (state: Diploma, action: PayloadAction<DiplomaFilter>) => {
		state.diplomaFilter = action.payload;
	},
};
