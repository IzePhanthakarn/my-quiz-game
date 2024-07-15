import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface CourseManipulate {
	grid: CourseManipulateGrid;
	filter: CourseManipulateFilter;
	form: CourseManipulateForm;
}

export interface CourseManipulateGrid extends PaginationModel {
	data: CourseManipulateGridData[];
}

export interface CourseManipulateGridData {
	courseCategoryId: number;
	courseCategory: string;
	formatCode: string;
	categoryDescription: string;
	categorySubDesc: string;
	organizeGroupCode: string;
	organizeSubGroupCode: string;
	situation: string;
}

export interface CourseManipulateFilter {
	courseCategoryId: number;
	categoryDescription: string;
}

export interface CourseManipulateForm {
	id: number;
}

export const modelCourseManipulate: CourseManipulate = {
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
		id: 0,
	},
};
