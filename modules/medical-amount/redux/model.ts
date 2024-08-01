import { IsActive } from "../../../constants/constants";
import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { DateFormat } from "../../../constants/date-format.constant";
import dayjs from "dayjs";
import { getCurrentDateString } from "../../../utils";

export interface MedicalAmount {
	grid: MedicalAmountGrid;
	filter: MedicalAmountFilter;
	form: MedicalAmountForm;
}

export interface MedicalAmountGrid extends PaginationModel {
	data: MedicalAmountGridData[];
}

export interface MedicalAmountGridData {
	amount: number;
	fareAmount: number;
	amountLimit: number;
	startEffectiveDate: null | string;
	endEffectiveDate: null | string;
	notice: string;

	createdBy: string;
	createdDate: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export interface MedicalAmountFilter {
	amount: string | null;
	fareAmount: string | null;
	amountLimit: string | null;
	startEffectiveDate: null | string;
	endEffectiveDate: null | string;
	noticeLike: null | string;

	checkAmount: boolean;
	checkFareAmount: boolean;
	checkAmountLimit: boolean;
	checkStartEffectiveDate: boolean;
	checkEndEffectiveDate: boolean;
	checkNotice: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetMedicalAmountList extends MedicalAmountFilter {
	pagination: PaginationOptions;
}
export interface MedicalAmountForm {
	amount: string;
	fareAmount: string;
	amountLimit: string;
	startEffectiveDate: null | string | undefined;
	endEffectiveDate: null | string | undefined;
	notice: string;

	createdBy: string;
	createdDate: string;
	isActive: IsActive;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export const modelMedicalAmount: MedicalAmount = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		amount: "",
		fareAmount: "",
		amountLimit: "",
		// startEffectiveDate: getCurrentDateString(),
		// endEffectiveDate: getCurrentDateString(),
		startEffectiveDate: "",
		endEffectiveDate: "",
		noticeLike: "",

		checkAmount: false,
		checkFareAmount: false,
		checkAmountLimit: false,
		checkStartEffectiveDate: false,
		checkEndEffectiveDate: false,
		checkNotice: false,
		isActive: undefined,
		checkIsActive: false,
	},
	form: {
		amount: "0",
		fareAmount: "0",
		amountLimit: "0",
		startEffectiveDate: undefined,
		endEffectiveDate: undefined,
		notice: "",

		createdBy: "",
		createdDate: "",
		isActive: IsActive.Y,
		updatedBy: "",
		updatedDate: "",
		uuid: "",
	},
};
