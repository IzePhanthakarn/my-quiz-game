import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
export interface CourseOrganSystemGroup {
	grid: CourseOrganSystemGroupGrid;
	filter: CourseOrganSystemGroupFilter;
	form: CourseOrganSystemGroupForm;
}

export interface CourseOrganSystemGroupGrid extends PaginationModel {
	data: CourseOrganSystemGroupGridData[];
}

export interface CourseOrganSystemGroupGridData
	extends BaseMasterDataInterface {
	organSystemGroup: string;
	courseCategory: string;
	organSystemNo: string;
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
export interface CourseOrganSystemGroupForm extends BaseMasterDataInterface {
	organSystemGroup: string;
	courseCategory: string;
	organSystemNo: string;
}

export const modelCourseOrganSystemGroupFilter: CourseOrganSystemGroupFilter = {
	organSystemGroupLike: "",
	courseCategoryLike: "",
	organSystemNoLike: "",
	checkOrganSystemGroup: false,
	checkCourseCategory: false,
	checkOrganSystemNo: false,
	isActive: IsActive.Y,
	checkIsActive: false,
};

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
		isActive: IsActive.Y,
		checkIsActive: false,
	},
	form: {
		...baseMasterDataModel,
		organSystemGroup: "",
		courseCategory: "",
		organSystemNo: "",
	},
};
