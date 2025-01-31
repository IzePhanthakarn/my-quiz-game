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
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}
export interface GetCourseCategoryList extends CourseCategoryFilter {
	pagination: PaginationOptions;
}
export interface CourseCategoryForm extends BaseMasterDataInterface {
	categoryDescription: string;
	categorySubDesc: string;
	courseCategory: string;
	formatCode: string;
	organizeGroupCode: string;
	organizeSubGroupCode: string;
	situation: string;
}

export const modelCourseCategoryFilter: CourseCategoryFilter = {
	categoryDescriptionLike: "",
	checkCategoryDescriptionLike: false,
	isActive: IsActive.Y,
	checkIsActive: false,
};

export const modelCourseCategory: CourseCategory = {
	grid: {
		data: [],
		page: { ...modelPaginationOptions },
	},
	filter: modelCourseCategoryFilter,
	form: {
		...baseMasterDataModel,
		categoryDescription: "",
		categorySubDesc: "",
		courseCategory: "",
		formatCode: "",
		organizeGroupCode: "",
		organizeSubGroupCode: "",
		situation: "",
	},
};
