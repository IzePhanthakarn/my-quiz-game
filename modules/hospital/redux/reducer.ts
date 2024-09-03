import { PayloadAction } from "@reduxjs/toolkit";
import {
	HospitalForm,
	HospitalGrid,
	HospitalFilter,
	Hospital,
	ExportPages,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { HospitalSp7, HospitalSp7Grid } from "./sp7model";
export const hospitalReducers = {
	setHospitalGrid: (state: Hospital, action: PayloadAction<HospitalGrid>) => {
		state.grid = action.payload;
	},
	setHospitalFilter: (
		state: Hospital,
		action: PayloadAction<HospitalFilter>
	) => {
		state.filter = action.payload;
	},
	setHospitalForm: (state: Hospital, action: PayloadAction<HospitalForm>) => {
		state.form = action.payload;
	},
	setHospitalPagination: (
		state: Hospital,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
	setExportPages: (
		state: Hospital,
		action: PayloadAction<{
			key: keyof ExportPages;
			value: ExportPages[keyof ExportPages];
		}>
	) => {
		state.exportPages = {
			...state.exportPages,
			[action.payload.key]: action.payload.value,
		};
	},
	setHospitalSp7Grid: (
		state: Hospital,
		action: PayloadAction<HospitalSp7Grid>
	) => {
		state.hospitalSp7.grid = action.payload;
	},
};
