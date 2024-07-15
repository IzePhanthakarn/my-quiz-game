import { PayloadAction } from "@reduxjs/toolkit";
import { Course } from "./model";
import {
	CourseManipulateForm,
	CourseManipulateGrid,
	CourseManipulateFilter,
} from "./model";
import { PaginationOptions } from "@/components/Pagination/redux/model";

export const courseManipulateReducers = {
	setCourseManipulateGrid: (
		state: Course,
		action: PayloadAction<CourseManipulateGrid>
	) => {
		state.grid = action.payload;
	},
	setCourseManipulateFilter: (
		state: Course,
		action: PayloadAction<CourseManipulateFilter>
	) => {
		state.filter = action.payload;
	},
	setCourseManipulateForm: (
		state: Course,
		action: PayloadAction<CourseManipulateForm>
	) => {
		state.form = action.payload;
	},
	setCourseManipulatePagination: (
		state: Course,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
