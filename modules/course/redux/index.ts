import { createSlice } from "@reduxjs/toolkit";
import { modelCourse } from "./model";
import { courseManipulateReducers } from "./manipulate/reducer";

export const courseSlice = createSlice({
	name: "Clinic",
	initialState: modelCourse,
	reducers: {
		...courseManipulateReducers,
	},
});

export const {
	// Manipulate
	setCourseManipulateForm,
	setCourseManipulateGrid,
	setCourseManipulateFilter,
	setCourseManipulatePagination,
} = courseSlice.actions;

export default courseSlice.reducer;
