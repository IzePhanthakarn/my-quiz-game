import { IsActive } from "../../../constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface CourseOrganSystemGroup {
	grid: CourseOrganSystemGroupGrid;
	filter: CourseOrganSystemGroupFilter;
	form: CourseOrganSystemGroupForm;
}

export interface CourseOrganSystemGroupGrid extends PaginationModel {
	data: CourseOrganSystemGroupGridData[];
}

export interface CourseOrganSystemGroupGridData {
	organSystemGroup: string;
	courseCategory: string;
	organSystemNo: string;

	createdBy: string;
	createdDate: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export interface CourseOrganSystemGroupFilter {
	organSystemGroupLike: string;
	courseCategoryLike: string;
	organSystemNoLike: string;

	checkOrganSystemGroup: boolean;
	checkCourseCategory: boolean;
	checkOrganSystemNo: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetCourseOrganSystemGroupList
	extends CourseOrganSystemGroupFilter {
	pagination: PaginationOptions;
}
export interface CourseOrganSystemGroupForm {
	organSystemGroup: string;
	courseCategory: string;
	organSystemNo: string;

	createdBy: string;
	createdDate: string;
	isActive: IsActive;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export const modelCourseOrganSystemGroup: CourseOrganSystemGroup = {
	grid: {
		data: [],
		page: { ...modelPaginationOptions },
	},
	filter: {
		organSystemGroupLike: "",
		courseCategoryLike: "",
		organSystemNoLike: "",
		checkOrganSystemGroup: false,
		checkCourseCategory: false,
		checkOrganSystemNo: false,
		isActive: undefined,
		checkIsActive: false,
	},
	form: {
		organSystemGroup: "",
		courseCategory: "",
		organSystemNo: "",

		createdBy: "",
		createdDate: "",
		isActive: IsActive.Y,
		updatedBy: "",
		updatedDate: "",
		uuid: "",
	},
};
