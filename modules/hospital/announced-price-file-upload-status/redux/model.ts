import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface HospitalAnnouncedPriceFileUploadStatus {
	grid: HospitalAnnouncedPriceFileUploadStatusGrid;
	filter: HospitalAnnouncedPriceFileUploadStatusFilter;
}

export interface HospitalAnnouncedPriceFileUploadStatusGrid
	extends PaginationModel {
	data: HospitalAnnouncedPriceFileUploadStatusGridData[];
}

export interface HospitalAnnouncedPriceFileUploadStatusGridData {
	hospitalWcfCode: string;
	announcedYear: string;
	status: string;
	errorReason: string;
}

export interface HospitalAnnouncedPriceFileUploadStatusFilter {
	hospitalWcfCodeLike: string;
	announcedYearLike: string;
	statusLike: string;
}
export interface GetHospitalAnnouncedPriceFileUploadStatusList
	extends HospitalAnnouncedPriceFileUploadStatusFilter {
	pagination: PaginationOptions;
}

export const modelHospitalAnnouncedPriceFileUploadStatus: HospitalAnnouncedPriceFileUploadStatus =
	{
		grid: {
			data: [],
			page: { ...modelPaginationOptions },
		},
		filter: {
			hospitalWcfCodeLike: "",
			announcedYearLike: "",
			statusLike: "",
		},
	};
