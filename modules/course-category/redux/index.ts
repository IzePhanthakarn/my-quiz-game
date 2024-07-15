import { createSlice } from "@reduxjs/toolkit";
import { modelCourseCategory } from "./model";
import { courseCategoryReducers } from "./reducer";

export const courseCategorySlice = createSlice({
	name: "Clinic",
	initialState: modelCourseCategory,
	reducers: {
		...courseCategoryReducers,
	},
});

export const {
	setCourseCategoryForm,
	setCourseCategoryGrid,
	setCourseCategoryFilter,
	setCourseCategoryPagination,
} = courseCategorySlice.actions;

export default courseCategorySlice.reducer;
