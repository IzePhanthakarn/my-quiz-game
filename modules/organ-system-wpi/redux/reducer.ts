import { PayloadAction } from "@reduxjs/toolkit";
import {
	OrganSystemWpiForm,
	OrganSystemWpiGrid,
	OrganSystemWpiFilter,
	OrganSystemWpi,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";

export const organManipulateReducers = {
	setOrganSystemWpiGrid: (
		state: OrganSystemWpi,
		action: PayloadAction<OrganSystemWpiGrid>
	) => {
		state.grid = action.payload;
	},
	setOrganSystemWpiFilter: (
		state: OrganSystemWpi,
		action: PayloadAction<OrganSystemWpiFilter>
	) => {
		state.filter = action.payload;
	},
	setOrganSystemWpiForm: (
		state: OrganSystemWpi,
		action: PayloadAction<OrganSystemWpiForm>
	) => {
		state.form = action.payload;
	},
	setOrganSystemWpiPagination: (
		state: OrganSystemWpi,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
