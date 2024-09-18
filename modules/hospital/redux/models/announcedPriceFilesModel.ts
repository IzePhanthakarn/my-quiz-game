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

export interface HospitalAnnouncedPriceFiles {
	grid: HospitalAnnouncedPriceFilesGrid;
	filter: HospitalAnnouncedPriceFilesGridFilter;
}

export interface HospitalAnnouncedPriceFilesGrid extends PaginationModel {
	data: HospitalAnnouncedPriceFilesGridData[];
}

export interface HospitalAnnouncedPriceFilesGridData
	extends BaseMasterDataInterface {
	fileName: string;
	uuid: string;
	announcedYear: string;
}

export interface HospitalAnnouncedPriceFilesGridFilter {
	hospitalId: number;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
	uuidExclusionList: DeleteFileList;
}

export interface GetHospitalAnnouncedPriceFilesList
	extends HospitalAnnouncedPriceFilesGridFilter {
	pagination: PaginationOptions;
	hospitalUuid?: string | undefined | null;
}

export const modelHospitalAnnouncedPriceFiles: HospitalAnnouncedPriceFiles = {
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
