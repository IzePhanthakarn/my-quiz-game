import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";

export interface HospitalSp19 {
	grid: HospitalSp19Grid;
	filter: HospitalSp19GridFilter;
}

export interface HospitalSp19Grid extends PaginationModel {
	data: HospitalSp19GridData[];
}

export interface HospitalSp19GridData extends BaseMasterDataInterface {
	fileName: string;
	uuid: string;
	sp19StartDate: null | string | undefined;
	sp19EndDate: null | string | undefined;
}

export interface HospitalSp19GridFilter {
	// hospitalWcfCodeLike: string | null;
	// hospitalDbmsCodeLike: string | null;
	// hospitalMinistryCodeLike: string | null;
	// hospitalNameLike: string | null;

	// CheckHospitalWcfCode: boolean;
	// CheckHospitalDbmsCode: boolean;
	// CheckHospitalMinistryCode: boolean;
	// CheckHospitalName: boolean;
	// uuid: string;
	hospitalId: number;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetHospitalSp19List extends HospitalSp19GridFilter {
	pagination: PaginationOptions;
	hospitalUuid?: string | undefined | null;
}

export const modelHospitalSp19: HospitalSp19 = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		// uuid: "",
		hospitalId: 0,
		isActive: undefined,
		checkIsActive: false,
	},
	// form: {
	// 	...baseMasterDataModel,

	// },
};
