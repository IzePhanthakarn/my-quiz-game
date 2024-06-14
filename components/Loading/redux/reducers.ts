import { PayloadAction } from "@reduxjs/toolkit";
import { Loading } from "./model";

export const loadingReducers = {
	setIsLoading: (state: Loading, action: PayloadAction<boolean>) => {
		state.isLoading = action.payload;
	},
};
