import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
import { UploadFile } from "wcf-component-lib/node_modules/antd";

export interface HospitalAttachment {
	grid: HospitalAttachmentGrid;
	filter: HospitalAttachmentGridFilter;
	toPreview: UploadFile[];
}

export interface HospitalAttachmentGrid extends PaginationModel {
	data: HospitalAttachmentGridData[];
}

export interface HospitalAttachmentGridData extends BaseMasterDataInterface {
	fileName: string;
	uuid: string;
	attachmentName: string;
	extension: string;
}

export interface HospitalAttachmentGridFilter {
	hospitalId: number;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetHospitalAttachmentList
	extends HospitalAttachmentGridFilter {
	pagination: PaginationOptions;
	hospitalWcfCode?: string | undefined | null;
	fieldName?: string | undefined | null;
}

export const modelHospitalAttachment: HospitalAttachment = {
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
		isActive: undefined,
		checkIsActive: false,
	},
	toPreview: [],
};
