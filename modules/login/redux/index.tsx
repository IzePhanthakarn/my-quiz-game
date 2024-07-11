import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login, modelLogin } from "./model";

export const loginSlice = createSlice({
	name: "Login",
	initialState: modelLogin,
	reducers: {
		setUserName: (state: Login, actions: PayloadAction<Login>) => {
			state.username = actions.payload.username;
		},
		setPassword: (state: Login, actions: PayloadAction<Login>) => {
			state.password = actions.payload.password;
		},
	},
});

export const { setUserName, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
