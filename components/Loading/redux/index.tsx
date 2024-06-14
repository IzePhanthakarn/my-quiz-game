import { createSlice } from "@reduxjs/toolkit";
import { modelLoading } from "./model";
import { loadingReducers } from "./reducers";

export const loadingSlice = createSlice({
	name: "Loading",
	initialState: modelLoading,
	reducers: {
		...loadingReducers,
	},
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
