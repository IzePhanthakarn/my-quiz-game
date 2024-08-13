import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Container, modelContainer } from "./model";

export const containerSlice = createSlice({
	name: "Container",
	initialState: modelContainer,
	reducers: {
		setIsLoading: (state: Container, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setUuid: (state: Container, action: PayloadAction<string>) => {
			state.uuid = action.payload;
		},
	},
});

export const { setIsLoading, setUuid } = containerSlice.actions;

export default containerSlice.reducer;
