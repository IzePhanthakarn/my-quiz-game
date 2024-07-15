import { PayloadAction } from "@reduxjs/toolkit";
import {
	PaginationOptions,
	SortOrdersModel,
} from "wcf-component-lib/src/components/BasePagination/model";
import { Diploma } from "../model";
import { DiplomaList } from "./model";

export const diplomaReducers = {
	setClinicGrid: (state: Diploma, action: PayloadAction<DiplomaList[]>) => {
		state.grid.list = action.payload;
	},
	setPagination: (state: Diploma, action: PayloadAction<PaginationOptions>) => {
		state.grid.page = { ...action.payload };
	},
	setOrder: (state: Diploma, action: PayloadAction<SortOrdersModel[]>) => {
		state.grid.page.orders = action.payload;
	},
	setTotalData: (state: Diploma, action: PayloadAction<number>) => {
		state.grid.page.totalData = action.payload;
	},
};
