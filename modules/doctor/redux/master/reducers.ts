import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorList } from "./model";
import {
	PaginationOptions,
	SortOrdersModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export const doctorReducers = {
	setDoctorGrid: (state: Doctor, action: PayloadAction<DoctorList[]>) => {
		state.grid.list = action.payload;
	},
	setPagination: (state: Doctor, action: PayloadAction<PaginationOptions>) => {
		state.grid.page = { ...action.payload };
	},
	setOrder: (state: Doctor, action: PayloadAction<SortOrdersModel[]>) => {
		state.grid.page.orders = action.payload;
	},
	setTotalData: (state: Doctor, action: PayloadAction<number>) => {
		state.grid.page.totalData = action.payload;
	},
};
