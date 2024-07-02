import { PayloadAction } from "@reduxjs/toolkit";
import { Organ } from "../model";
import {
	OrganManipulateForm,
	OrganManipulateGrid,
	OrganManipulateFilter,
} from "./model";
import { PaginationOptions } from "@/components/Pagination/redux/model";

export const organManipulateReducers = {
	setOrganManipulateGrid: (
		state: Organ,
		action: PayloadAction<OrganManipulateGrid>
	) => {
		state.manipulate.grid = action.payload;
	},
	setOrganManipulateFilter: (
		state: Organ,
		action: PayloadAction<OrganManipulateFilter>
	) => {
		state.manipulate.filter = action.payload;
	},
	setOrganManipulateForm: (
		state: Organ,
		action: PayloadAction<OrganManipulateForm>
	) => {
		state.manipulate.form = action.payload;
	},
	setOrganManipulatePagination: (
		state: Organ,
		action: PayloadAction<PaginationOptions>
	) => {
		state.manipulate.grid.page = { ...action.payload };
	},
};
