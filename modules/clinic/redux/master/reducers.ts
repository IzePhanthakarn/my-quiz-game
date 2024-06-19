import { PayloadAction } from "@reduxjs/toolkit";
import { ClinicGrid, ClinicList } from "./model";
import {
	PaginationOptions,
	SortOrdersModel,
} from "@/components/Pagination/redux/model";
import { Clinic, ClinicDetail, ClinicDetailError } from "../model";

export const clinicReducers = {
	setClinicGrid: (state: Clinic, action: PayloadAction<ClinicList[]>) => {
		state.grid.list = action.payload;
	},
	setClinicDetail: (state: Clinic, action: PayloadAction<ClinicDetail>) => {
		state.clinicDetail = action.payload;
	},
	setPagination: (state: Clinic, action: PayloadAction<PaginationOptions>) => {
		state.grid.page = { ...action.payload };
	},
	setOrder: (state: Clinic, action: PayloadAction<SortOrdersModel[]>) => {
		state.grid.page.orders = action.payload;
	},
	setTotalData: (state: Clinic, action: PayloadAction<number>) => {
		state.grid.page.totalData = action.payload;
	},
	setClinicDetailError: (
		state: Clinic,
		action: PayloadAction<ClinicDetailError>
	) => {
		state.clinicDetailError = action.payload;
	},
};
