import { PayloadAction } from "@reduxjs/toolkit";
import { CourseCertificate } from "./model";
import {
	CourseCertificateForm,
	CourseCertificateGrid,
	CourseCertificateFilter,
} from "./model";
import { PaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
export const courseCertificateReducers = {
	setCourseCertificateGrid: (
		state: CourseCertificate,
		action: PayloadAction<CourseCertificateGrid>
	) => {
		state.grid = action.payload;
	},
	setCourseCertificateFilter: (
		state: CourseCertificate,
		action: PayloadAction<CourseCertificateFilter>
	) => {
		state.filter = action.payload;
	},
	setCourseCertificateForm: (
		state: CourseCertificate,
		action: PayloadAction<CourseCertificateForm>
	) => {
		state.form = action.payload;
	},
	setCourseCertificatePagination: (
		state: CourseCertificate,
		action: PayloadAction<PaginationOptions>
	) => {
		state.grid.page = { ...action.payload };
	},
};
