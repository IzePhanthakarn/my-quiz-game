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

export interface HospitalStaffContact {
	grid: HospitalStaffContactGrid;
	filter: HospitalStaffContactGridFilter;
	uuidDeleteList: UuidDeleteList;
	form: HospitalStaffContactForm;
}

export interface HospitalStaffContactGrid extends PaginationModel {
	data: HospitalStaffContactGridData[];
}

export interface HospitalStaffContactGridData
	extends HospitalStaffContactForm,
		BaseMasterDataInterface {
	order: number | string;
}

export interface HospitalStaffContactForm {
	firstName: string;
	lastName: string;
	position: string;
	contact: string;
}

export interface HospitalStaffContactGridFilter {
	hospitalId: number;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetHospitalStaffContactList
	extends HospitalStaffContactGridFilter {
	pagination: PaginationOptions;
	hospitalUuid?: string | undefined | null;
}

export const modelHospitalStaffContact: HospitalStaffContact = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 99,
		},
	},
	filter: {
		hospitalId: 0,
		isActive: IsActive.Y,
		checkIsActive: false,
	},
	uuidDeleteList: [],
	form: {
		...baseMasterDataModel,
		firstName: "",
		lastName: "",
		position: "",
		contact: "",
	},
};
