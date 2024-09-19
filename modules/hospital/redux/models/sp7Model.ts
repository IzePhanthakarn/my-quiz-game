import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
import { DeleteFileList } from "./hospitalModel";

export interface HospitalSp7 {
	grid: HospitalSp7Grid;
	filter: HospitalSp7GridFilter;
}

export interface HospitalSp7Grid extends PaginationModel {
	data: HospitalSp7GridData[];
}

export interface HospitalSp7GridData extends BaseMasterDataInterface {
	fileName: string;
	uuid: string;
	sp7StartDated: null | string | undefined;
	sp7EndDate: null | string | undefined;
}

export interface HospitalSp7GridFilter {
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
	uuidExclusionList: DeleteFileList;
}

export interface GetHospitalSp7List extends HospitalSp7GridFilter {
	pagination: PaginationOptions;
	hospitalUuid?: string | undefined | null;
}

export const modelHospitalSp7: HospitalSp7 = {
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
		isActive: IsActive.Y,
		checkIsActive: false,
		uuidExclusionList: [],
	},
	// form: {
	// 	...baseMasterDataModel,

	// },
};
