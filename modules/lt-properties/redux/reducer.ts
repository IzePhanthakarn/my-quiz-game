import { PayloadAction } from "@reduxjs/toolkit";
import {
	LtPropertiesForm,
	LtPropertiesGrid,
	LtPropertiesFilter,
	LtProperties,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const ltPropertiesReducers = {
	setLtPropertiesGrid: (
		state: LtProperties,
		action: PayloadAction<LtPropertiesGrid>
	) => {
		state.grid = action.payload;
	},
	setLtPropertiesFilter: (
		state: LtProperties,
		action: PayloadAction<LtPropertiesFilter>
	) => {
		state.filter = action.payload;
	},
	setLtPropertiesForm: (
		state: LtProperties,
		action: PayloadAction<LtPropertiesForm>
	) => {
		state.form = action.payload;
	},
	setLtPropertiesPagination: (
		state: LtProperties,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
