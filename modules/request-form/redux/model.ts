import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	baseMasterDataModel,
	BaseMasterDataInterface,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";

export interface RequestForm {
	grid: RequestFormGrid;
	filter: RequestFormFilter;
	form: RequestFormDetail;
}

export interface RequestFormGrid extends PaginationModel {
	data: RequestFormGridData[];
}

export interface RequestFormGridData extends BaseMasterDataInterface {
	requestFormCode: string;
	requestFormStatus: string;
	accidentIssueCode: string;
	employeeCitizenId: string;
	doctorCode: string;
	approveStatus: string;
	approveBy: string;
	approveDate: string;
	assessDate: string;
	amount: number;
	placeType: string;
	hospitalWcfCode: string;
	paymentCode: string;
	houseNum: string;
	moo: string;
	road: string;
	soi: string;
	tambol: string;
	amphur: string;
	province: string;
	postCode: string;
	starTime: string;
	endTime: string;
	ssoBranchCode: string;
	paymentStatusFlag: string;
	remarkRequestForm: string;
	remarkApprove: string;
	diplomaType: string;
	userName: string;
	userPosition: string;
	totalHours: number;
	fareAmount: number;
	inAnotherPlace: string;
	tambolCode: string;
	accidentIssueCodeCompare: string;
	empNum: string;
	updFlg: string;
	accidentIssueCodeBack: string;
	requestPayDate: string;
}

export interface RequestFormFilter {
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export type RequestFormDetail = RequestFormGridData;

export const modelRequestFormGrid: RequestFormGrid = {
	data: [],
	page: { ...modelPaginationOptions },
};
export const modelRequestFormFilter: RequestFormFilter = {
	isActive: undefined,
	checkIsActive: false,
};
export const modelRequestFormDetail: RequestFormDetail = {
	...baseMasterDataModel,
	requestFormCode: "",
	requestFormStatus: "",
	accidentIssueCode: "",
	employeeCitizenId: "",
	doctorCode: "",
	approveStatus: "",
	approveBy: "",
	approveDate: "",
	assessDate: "",
	amount: 0,
	placeType: "",
	hospitalWcfCode: "",
	paymentCode: "",
	houseNum: "",
	moo: "",
	road: "",
	soi: "",
	tambol: "",
	amphur: "",
	province: "",
	postCode: "",
	starTime: "",
	endTime: "",
	ssoBranchCode: "",
	paymentStatusFlag: "",
	remarkRequestForm: "",
	remarkApprove: "",
	diplomaType: "",
	userName: "",
	userPosition: "",
	totalHours: 0,
	fareAmount: 0,
	inAnotherPlace: "",
	tambolCode: "",
	accidentIssueCodeCompare: "",
	empNum: "",
	updFlg: "",
	accidentIssueCodeBack: "",
	requestPayDate: "",
};
export const modelRequestForm: RequestForm = {
	grid: modelRequestFormGrid,
	filter: modelRequestFormFilter,
	form: modelRequestFormDetail,
};
