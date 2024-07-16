import { createSlice } from "@reduxjs/toolkit";
import { modelCourseCertificate } from "./model";
import { courseCertificateReducers } from "./reducer";

export const courseCategorySlice = createSlice({
	name: "Clinic",
	initialState: modelCourseCertificate,
	reducers: {
		...courseCertificateReducers,
	},
});

export const {
	setCourseCertificateForm,
	setCourseCertificateGrid,
	setCourseCertificateFilter,
	setCourseCertificatePagination,
} = courseCategorySlice.actions;

export default courseCategorySlice.reducer;
