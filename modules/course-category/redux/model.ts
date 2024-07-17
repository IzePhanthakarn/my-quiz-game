import { IsActive } from "../../../constants/constants";
import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface CourseCategory {
	grid: CourseCategoryGrid;
	filter: CourseCategoryFilter;
	form: CourseCategoryForm;
}

export interface CourseCategoryGrid extends PaginationModel {
	data: CourseCategoryGridData[];
}

export interface CourseCategoryGridData {
	courseCategoryId: number;
	courseCategory: string;
	formatCode: string;
	categoryDescription: string;
	categorySubDesc: string;
	organizeGroupCode: string;
	organizeSubGroupCode: string;
	situation: string;
}

export interface CourseCategoryFilter {
	checkCategoryDescriptionLike: boolean;
	categoryDescriptionLike: string;
	isActive: string;
}

export type GetCourseCategoryList = CourseCategoryFilter & PaginationOptions;
export interface CourseCategoryForm {
	categoryDescription: string;
	categorySubDesc: string;
	courseCategory: string;
	formatCode: string;
	organizeGroupCode: string;
	organizeSubGroupCode: string;
	situation: string;

	// createdBy: string;
	// createdDate: string;
	isActive: string;
	// updatedBy: string;
	// updatedDate: string;
	uuid: string;
}

export const modelCourseCategory: CourseCategory = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		categoryDescriptionLike: "",
		checkCategoryDescriptionLike: false,
		isActive: IsActive.Y,
	},
	form: {
		categoryDescription: "",
		categorySubDesc: "",
		courseCategory: "",
		formatCode: "",
		organizeGroupCode: "",
		organizeSubGroupCode: "",
		situation: "",
		// createdBy: "",
		// createdDate: "",
		isActive: IsActive.Y,
		// updatedBy: "",
		// updatedDate: "",
		uuid: "",
	},
};
