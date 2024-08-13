import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	modelRequestForm,
	RequestForm,
	RequestFormDetail,
	RequestFormFilter,
	RequestFormGrid,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";

export const requestFormSlice = createSlice({
	name: "RequestForm",
	initialState: modelRequestForm,
	reducers: {
		setRequestFormGrid: (
			state: RequestForm,
			action: PayloadAction<RequestFormGrid>
		) => {
			state.grid = action.payload;
		},
		setRequestFormFilter: (
			state: RequestForm,
			action: PayloadAction<RequestFormFilter>
		) => {
			state.filter = action.payload;
		},
		setRequestFormDetail: (
			state: RequestForm,
			action: PayloadAction<RequestFormDetail>
		) => {
			state.form = { ...action.payload };
		},
		setRequestFormPagination: (
			state: RequestForm,
			action: PayloadAction<PaginationOptions>
		) => {
			state.grid.page = { ...action.payload };
		},
	},
});

export const {
	setRequestFormGrid,
	setRequestFormFilter,
	setRequestFormDetail,
	setRequestFormPagination,
} = requestFormSlice.actions;

export default requestFormSlice.reducer;
