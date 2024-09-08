import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseDialog, modelDialog } from "./model";

export const dialogSlice = createSlice({
	name: "Dialog",
	initialState: modelDialog,
	reducers: {
		setIsOpenDialog: (state: BaseDialog, actions: PayloadAction<boolean>) => {
			state.isOpen = actions.payload;
		},
		setOnConfirmDialog: (
			state: BaseDialog,
			actions: PayloadAction<() => void>
		) => {
			state.onConfirm = actions.payload;
		},
		setOnCancelDialog: (
			state: BaseDialog,
			actions: PayloadAction<() => void>
		) => {
			state.onCancel = actions.payload;
		},
		setIsOpenBaseConfirmDialog: (
			state: BaseDialog,
			actions: PayloadAction<boolean>
		) => {
			state.isOpenBaseConfirmDialog = actions.payload;
		},
		setContentDialog: (
			state: BaseDialog,
			actions: PayloadAction<JSX.Element>
		) => {
			state.content = actions.payload;
		},
		setUniqueContentDialog: (
			state: BaseDialog,
			actions: PayloadAction<JSX.Element>
		) => {
			state.uniqueContent = actions.payload;
		},
		setDialog: (_, actions: PayloadAction<BaseDialog>) => {
			return { ...actions.payload };
		},
	},
});

export const {
	setOnConfirmDialog,
	setOnCancelDialog,
	setIsOpenDialog,
	setIsOpenBaseConfirmDialog,
	setContentDialog,
	setDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
