import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
import { UuidDeleteList } from "./hospitalModel";

export interface HospitalEtcFiles {
	grid: HospitalEtcFilesGrid;
	filter: HospitalEtcFilesGridFilter;
}

export interface HospitalEtcFilesGrid extends PaginationModel {
	data: HospitalEtcFilesGridData[];
}

export interface HospitalEtcFilesGridData extends BaseMasterDataInterface {
	fileName: string;
	uuid: string;
}

export interface HospitalEtcFilesGridFilter {
	hospitalId: number;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
	uuidExclusionList: UuidDeleteList;
}

export interface GetHospitalEtcFilesList extends HospitalEtcFilesGridFilter {
	pagination: PaginationOptions;
	hospitalUuid?: string | undefined | null;
}

export const modelHospitalEtcFiles: HospitalEtcFiles = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		hospitalId: 0,
		isActive: IsActive.Y,
		checkIsActive: false,
		uuidExclusionList: [],
	},
};
