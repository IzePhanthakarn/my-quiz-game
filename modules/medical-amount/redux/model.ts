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
export interface MedicalAmount {
	grid: MedicalAmountGrid;
	filter: MedicalAmountFilter;
	form: MedicalAmountForm;
}

export interface MedicalAmountGrid extends PaginationModel {
	data: MedicalAmountGridData[];
}

export interface MedicalAmountGridData extends BaseMasterDataInterface {
	amount: number;
	fareAmount: number;
	amountLimit: number;
	startEffectiveDate: null | string;
	endEffectiveDate: null | string;
	notice: string;
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
export interface MedicalAmountForm extends BaseMasterDataInterface {
	amount: string;
	fareAmount: string;
	amountLimit: string;
	startEffectiveDate: null | string | undefined;
	endEffectiveDate: null | string | undefined;
	notice: string;
}

export const modelMedicalAmount: MedicalAmount = {
	grid: {
		data: [],
		page: { ...modelPaginationOptions },
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
		...baseMasterDataModel,
		amount: "0",
		fareAmount: "0",
		amountLimit: "0",
		startEffectiveDate: undefined,
		endEffectiveDate: undefined,
		notice: "",
	},
};
