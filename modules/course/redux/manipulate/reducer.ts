import { PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../model";
import {
	CourseManipulateForm,
	CourseManipulateGrid,
	CourseManipulateFilter,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";

export const courseManipulateReducers = {
	setCourseManipulateGrid: (
		state: Course,
		action: PayloadAction<CourseManipulateGrid>
	) => {
		state.manipulate.grid = action.payload;
	},
	setCourseManipulateFilter: (
		state: Course,
		action: PayloadAction<CourseManipulateFilter>
	) => {
		state.manipulate.filter = action.payload;
	},
	setCourseManipulateForm: (
		state: Course,
		action: PayloadAction<CourseManipulateForm>
	) => {
		state.manipulate.form = action.payload;
	},
	setCourseManipulatePagination: (
		state: Course,
		action: PayloadAction<PaginationOptions>
	) => {
		state.manipulate.grid.page = { ...action.payload };
	},
};
