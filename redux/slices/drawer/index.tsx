import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseDrawer, modelDrawer } from "./model";

export const drawerSlice = createSlice({
	name: "Drawer",
	initialState: modelDrawer,
	reducers: {
		setIsOpenDrawer: (state: BaseDrawer, actions: PayloadAction<boolean>) => {
			state.isOpen = actions.payload;
		},
	},
});

export const { setIsOpenDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
