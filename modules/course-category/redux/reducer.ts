import { PayloadAction } from "@reduxjs/toolkit";
import {
	CourseCategory,
	CourseCategoryForm,
	CourseCategoryGrid,
	CourseCategoryFilter,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const courseCategoryReducers = {
	setCourseCategoryGrid: (
		state: CourseCategory,
		action: PayloadAction<CourseCategoryGrid>
	) => {
		state.grid = action.payload;
	},
	setCourseCategoryFilter: (
		state: CourseCategory,
		action: PayloadAction<CourseCategoryFilter>
	) => {
		state.filter = action.payload;
	},
	setCourseCategoryForm: (
		state: CourseCategory,
		action: PayloadAction<CourseCategoryForm>
	) => {
		state.form = action.payload;
	},
	setCourseCategoryPagination: (
		state: CourseCategory,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
