import { PayloadAction } from "@reduxjs/toolkit";
import { Clinic, ClinicDetail } from "../model";
import { ClinicGrid, ClinicList } from "./model";
import { PaginationOptions } from "@/components/Pagination/redux/model";

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
	setTotalData: (state: Clinic, action: PayloadAction<number>) => {
		state.grid.page.totalData = action.payload;
	},
};
