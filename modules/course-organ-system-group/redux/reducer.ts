import { PayloadAction } from "@reduxjs/toolkit";
import { CourseOrganSystemGroup } from "./model";
import {
	CourseOrganSystemGroupForm,
	CourseOrganSystemGroupGrid,
	CourseOrganSystemGroupFilter,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const courseCertificateReducers = {
	setCourseOrganSystemGroupGrid: (
		state: CourseOrganSystemGroup,
		action: PayloadAction<CourseOrganSystemGroupGrid>
	) => {
		state.grid = action.payload;
	},
	setCourseOrganSystemGroupFilter: (
		state: CourseOrganSystemGroup,
		action: PayloadAction<CourseOrganSystemGroupFilter>
	) => {
		state.filter = action.payload;
	},
	setCourseOrganSystemGroupForm: (
		state: CourseOrganSystemGroup,
		action: PayloadAction<CourseOrganSystemGroupForm>
	) => {
		state.form = action.payload;
	},
	setCourseOrganSystemGroupPagination: (
		state: CourseOrganSystemGroup,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
