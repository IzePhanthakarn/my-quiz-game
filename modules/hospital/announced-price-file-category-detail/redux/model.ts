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
export interface HospitalAnnouncedPriceFileCategoryDetail {
	grid: HospitalAnnouncedPriceFileCategoryDetailGrid;
	filter: HospitalAnnouncedPriceFileCategoryDetailFilter;
	form: HospitalAnnouncedPriceFileCategoryDetailForm;
}

export interface HospitalAnnouncedPriceFileCategoryDetailGrid
	extends PaginationModel {
	data: HospitalAnnouncedPriceFileCategoryDetailGridData[];
}

export interface HospitalAnnouncedPriceFileCategoryDetailGridData {
	categoryCode: string;
	categoryName: string;
}

export interface HospitalAnnouncedPriceFileCategoryDetailFilter {
	categoryCodeLike: string;
	categoryNameLike: string;

	checkCategoryCode: boolean;
	checkCategoryName: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}
export interface GetHospitalAnnouncedPriceFileCategoryDetailList
	extends HospitalAnnouncedPriceFileCategoryDetailFilter {
	pagination: PaginationOptions;
}

export interface HospitalAnnouncedPriceFileCategoryDetailForm
	extends BaseMasterDataInterface {
	categoryCode: string;
	categoryName: string;
}

export const modelHospitalAnnouncedPriceFileCategoryDetail: HospitalAnnouncedPriceFileCategoryDetail =
	{
		grid: {
			data: [],
			page: { ...modelPaginationOptions },
		},
		filter: {
			categoryCodeLike: "",
			categoryNameLike: "",
			checkCategoryCode: false,
			checkCategoryName: false,
			isActive: IsActive.Y,
			checkIsActive: false,
		},
		form: {
			...baseMasterDataModel,
			categoryCode: "",
			categoryName: "",
		},
	};
