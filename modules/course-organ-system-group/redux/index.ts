import { createSlice } from "@reduxjs/toolkit";
import { modelCourseOrganSystemGroup } from "./model";
import { courseCertificateReducers } from "./reducer";

export const courseOrganSystemGroupSlice = createSlice({
	name: "CourseOrganSystemGroup",
	initialState: modelCourseOrganSystemGroup,
	reducers: {
		...courseCertificateReducers,
	},
});

export const {
	setCourseOrganSystemGroupForm,
	setCourseOrganSystemGroupGrid,
	setCourseOrganSystemGroupFilter,
	setCourseOrganSystemGroupPagination,
} = courseOrganSystemGroupSlice.actions;

export default courseOrganSystemGroupSlice.reducer;
