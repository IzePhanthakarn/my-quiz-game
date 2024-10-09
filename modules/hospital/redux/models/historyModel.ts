import { CompareList } from "../../../doctor/redux/history/model";

export interface HospitalHistory {
	compareList: HospitalCompareList;
	editTimesList: EditTimesList[];
	compareParams: FetchHospitalHistory;
}

export interface EditTimesList {
	editTimes: number;
	createdDate: string;
	createdBy: string;
}

export interface CompareFilesListObject {
	older: CompareFilesList[];
	newer: CompareFilesList[];
}

export interface CompareFilesList {
	fileName: string;
	isActive: string;
	isNew: boolean;
}

export interface HospitalCompareList {
	baseData: CompareList[];
	codeData: CompareList[];
	compensationFundInformationData: CompareList[];
	hospitalChangedNameData: CompareList[];
	hospitalSp7: CompareFilesListObject;
}

export interface FetchHospitalHistory {
	olderVersion: number | undefined;
	newerVersion: number | undefined;
}

export const modelHospitalHistory: HospitalHistory = {
	compareList: {
		baseData: [],
		codeData: [],
		compensationFundInformationData: [],
		hospitalChangedNameData: [],
		hospitalSp7: {
			older: [],
			newer: [],
		},
	},
	editTimesList: [],
	compareParams: {
		olderVersion: undefined,
		newerVersion: undefined,
	},
};
