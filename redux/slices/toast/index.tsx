import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";
import {
	modelToastNotification,
	ToastNotification,
} from "wcf-component-lib/src/components/BaseToastNotification/model";

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
