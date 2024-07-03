import { createSlice } from "@reduxjs/toolkit";
import { modelOrgan } from "./model";
import { organManipulateReducers } from "./manipulate/reducer";

export const organSlice = createSlice({
	name: "Clinic",
	initialState: modelOrgan,
	reducers: {
		...organManipulateReducers,
	},
});

export const {
	// Manipulate
	setOrganManipulateForm,
	setOrganManipulateGrid,
	setOrganManipulateFilter,
	setOrganManipulatePagination,
} = organSlice.actions;

export default organSlice.reducer;
