import { createSlice } from "@reduxjs/toolkit";
import { modelDocument } from "./model";
import { documentReducers } from "./reducer";

export const documentSlice = createSlice({
	name: "Clinic",
	initialState: modelDocument,
	reducers: {
		...documentReducers,
	},
});

export const {
	setDocumentForm,
	setDocumentGrid,
	setDocumentFilter,
	setDocumentPagination,
} = documentSlice.actions;

export default documentSlice.reducer;
