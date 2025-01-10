import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modelSsoUserList, SsoUser, SsoUserList } from "./model";

export const ssoUserSlice = createSlice({
	name: "SsoUser",
	initialState: modelSsoUserList,
	reducers: {
		setSsoUser: (state: SsoUserList, actions: PayloadAction<SsoUser[]>) => {
			state.list = actions.payload;
		},
	},
});

export const { setSsoUser } = ssoUserSlice.actions;

export default ssoUserSlice.reducer;
