import { PayloadAction } from "@reduxjs/toolkit";
import {
	MedicalAmountForm,
	MedicalAmountGrid,
	MedicalAmountFilter,
	MedicalAmount,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const medicalAmountReducers = {
	setMedicalAmountGrid: (
		state: MedicalAmount,
		action: PayloadAction<MedicalAmountGrid>
	) => {
		state.grid = action.payload;
	},
	setMedicalAmountFilter: (
		state: MedicalAmount,
		action: PayloadAction<MedicalAmountFilter>
	) => {
		state.filter = action.payload;
	},
	setMedicalAmountForm: (
		state: MedicalAmount,
		action: PayloadAction<MedicalAmountForm>
	) => {
		state.form = action.payload;
	},
	setMedicalAmountPagination: (
		state: MedicalAmount,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
