import { createSlice } from "@reduxjs/toolkit";
import { modelLtProperties } from "./model";
import { ltPropertiesReducers } from "./reducer";

export const ltPropertiesSlice = createSlice({
	name: "LtProperties",
	initialState: modelLtProperties,
	reducers: {
		...ltPropertiesReducers,
	},
});

export const {
	setLtPropertiesForm,
	setLtPropertiesGrid,
	setLtPropertiesFilter,
	setLtPropertiesPagination,
} = ltPropertiesSlice.actions;

export default ltPropertiesSlice.reducer;
