import { PayloadAction } from "@reduxjs/toolkit";
import { MinIO } from "./model";
export const minIOReducers = {
	setFile: (state: MinIO, action: PayloadAction<MinIO["file"]>) => {
		state.file = action.payload;
	},
	setMultipleFiles: (state: MinIO, action: PayloadAction<MinIO["files"]>) => {
		state.files = action.payload;
	},
};
