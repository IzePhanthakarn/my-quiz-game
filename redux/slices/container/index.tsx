import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Container, modelContainer } from "./model";

export const containerSlice = createSlice({
	name: "Container",
	initialState: modelContainer,
	reducers: {
		setIsLoading: (state: Container, action: PayloadAction<boolean>) => {
			if (state.isLoading === action.payload) return;
			state.isLoading = action.payload;
		},
		setUuid: (state: Container, action: PayloadAction<string>) => {
			state.uuid = action.payload;
		},
		setMounted: (state: Container, action: PayloadAction<string>) => {
			state.mounted = action.payload;
		},
	},
});

export const { setIsLoading, setUuid, setMounted } = containerSlice.actions;

export default containerSlice.reducer;
