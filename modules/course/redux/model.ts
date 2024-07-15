import { PaginationModel } from "@/components/Pagination/redux/model";

export interface Course {
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
	categoryDescription: string;
	categorySubDesc: string;
	courseCategory: string;
	formatCode: string;
	organizeGroupCode: string;
	organizeSubGroupCode: string;
	situation: string;

	createdBy: string;
	createdDate: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export const modelCourseManipulate: Course = {
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
		createdBy: "",
		createdDate: "",
		isActive: "",
		updatedBy: "",
		updatedDate: "",
		uuid: "",
	},
};

export const modelCourse: Course = {
	...modelCourseManipulate,
};
