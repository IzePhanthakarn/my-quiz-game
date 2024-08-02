import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastNotification, modelToastNotification } from "./model";
import lodash from "lodash";

export const toastSlice = createSlice({
	name: "Toast",
	initialState: modelToastNotification,
	reducers: {
		setToast: (_, actions: PayloadAction<ToastNotification>) => {
			return {
				...actions.payload,
				placement: lodash.get(actions.payload, "placement", "top"),
			};
		},
	},
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
