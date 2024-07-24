import { createSlice } from "@reduxjs/toolkit";
import { minIO } from "./model";
import { minIOReducers } from "./reducer";

export const minIOSlice = createSlice({
	name: "Clinic",
	initialState: minIO,
	reducers: {
		...minIOReducers,
	},
});

export const { setFile, setMultipleFiles } = minIOSlice.actions;

export default minIOSlice.reducer;
