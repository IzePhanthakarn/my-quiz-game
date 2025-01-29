import { createSlice } from "@reduxjs/toolkit";
import { modelOrganSystemWpi } from "./model";
import { organManipulateReducers } from "./reducer";

export const organSystemWpiSlice = createSlice({
	name: "OrganSystemWpi",
	initialState: modelOrganSystemWpi,
	reducers: {
		...organManipulateReducers,
	},
});

export const {
	setOrganSystemWpiForm,
	setOrganSystemWpiGrid,
	setOrganSystemWpiFilter,
	setOrganSystemWpiPagination,
} = organSystemWpiSlice.actions;

export default organSystemWpiSlice.reducer;
