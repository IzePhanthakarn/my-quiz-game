import { createSlice } from "@reduxjs/toolkit";
import { modelDiploma } from "./model";
import { diplomaReducers } from "./master/reducers";
import { diplomaFilterReducers } from "./filter/reducers";
import { diplomaFormReducers } from "./form/reducers";

export const diplomaSlice = createSlice({
	name: "Diploma",
	initialState: modelDiploma,
	reducers: {
		...diplomaReducers,
		...diplomaFilterReducers,
		...diplomaFormReducers,
	},
});

export const {
	setDiplomaGrid,
	setOrder,
	setPagination,
	setTotalData,
	setDiplomaFilter,
	setDiplomaDetail,
} = diplomaSlice.actions;

export default diplomaSlice.reducer;
