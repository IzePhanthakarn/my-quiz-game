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
export interface HospitalAnnouncedPriceDetailMaster {
	grid: HospitalAnnouncedPriceDetailMasterGrid;
	filter: HospitalAnnouncedPriceDetailMasterFilter;
	form: HospitalAnnouncedPriceDetailMasterForm;
}

export interface HospitalAnnouncedPriceDetailMasterGrid
	extends PaginationModel {
	data: HospitalAnnouncedPriceDetailMasterGridData[];
}

export interface HospitalAnnouncedPriceDetailMasterGridData {
	name: string;
	unitName: string;
	runningCode: string;
}

export interface HospitalAnnouncedPriceDetailMasterFilter {
	nameLike: string;
	unitNameLike: string;
	runningCodeLike: string;

	checkName: boolean;
	checkUnitName: boolean;
	checkRunningCode: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}
export interface GetHospitalAnnouncedPriceDetailMasterList
	extends HospitalAnnouncedPriceDetailMasterFilter {
	pagination: PaginationOptions;
}

export interface HospitalAnnouncedPriceDetailMasterForm
	extends BaseMasterDataInterface {
	name: string;
	unitName: string;
	runningCode: string;
	hospitalAnnouncedPriceDetailCategoryMasterUuid: string;
}

export const modelHospitalAnnouncedPriceDetailMaster: HospitalAnnouncedPriceDetailMaster =
	{
		grid: {
			data: [],
			page: { ...modelPaginationOptions },
		},
		filter: {
			nameLike: "",
			unitNameLike: "",
			runningCodeLike: "",
			checkName: false,
			checkUnitName: false,
			checkRunningCode: false,

			isActive: IsActive.Y,
			checkIsActive: false,
		},
		form: {
			...baseMasterDataModel,
			name: "",
			unitName: "",
			runningCode: "",
			hospitalAnnouncedPriceDetailCategoryMasterUuid: "",
		},
	};
