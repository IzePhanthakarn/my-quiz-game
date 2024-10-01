import { PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../model";
import { DoctorCompareList, compareParams, FilterList } from "./model";

export const doctorCompareHistoryReducers = {
	setDoctorCompareList: (
		state: Doctor,
		action: PayloadAction<DoctorCompareList>
	) => {
		state.doctorCompareHistory.compareList = { ...action.payload };
	},

	setDoctorFilterList: (state: Doctor, action: PayloadAction<FilterList[]>) => {
		state.doctorCompareHistory.filterList = action.payload;
	},

	setCompareParams: (state: Doctor, action: PayloadAction<compareParams>) => {
		state.doctorCompareHistory.compareParams = action.payload;
	},
};
