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
export interface HospitalAnnouncedPriceDetailCategoryMaster {
	grid: HospitalAnnouncedPriceDetailCategoryMasterGrid;
	filter: HospitalAnnouncedPriceDetailCategoryMasterFilter;
	form: HospitalAnnouncedPriceDetailCategoryMasterForm;
}

export interface HospitalAnnouncedPriceDetailCategoryMasterGrid
	extends PaginationModel {
	data: HospitalAnnouncedPriceDetailCategoryMasterGridData[];
}

export interface HospitalAnnouncedPriceDetailCategoryMasterGridData {
	categoryCode: string;
	categoryName: string;
}

export interface HospitalAnnouncedPriceDetailCategoryMasterFilter {
	categoryCodeLike: string;
	categoryNameLike: string;

	checkCategoryCode: boolean;
	checkCategoryName: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}
export interface GetHospitalAnnouncedPriceDetailCategoryMasterList
	extends HospitalAnnouncedPriceDetailCategoryMasterFilter {
	pagination: PaginationOptions;
}

export interface HospitalAnnouncedPriceDetailCategoryMasterForm
	extends BaseMasterDataInterface {
	categoryCode: string;
	categoryName: string;
}

export const modelHospitalAnnouncedPriceDetailCategoryMaster: HospitalAnnouncedPriceDetailCategoryMaster =
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
