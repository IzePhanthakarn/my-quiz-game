import { PaginationModel } from "@/components/Pagination/redux/model";
import { IsActive } from "../../../constants/constants";

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
	courseCategoryId: number;
	categoryDescription: string;
}

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
		courseCategoryId: 0,
		categoryDescription: "",
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
