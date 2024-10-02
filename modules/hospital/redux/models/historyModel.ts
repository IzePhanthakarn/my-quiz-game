import { CompareList } from "../../../doctor/redux/history/model";

export interface FetchHospitalHistory {
	olderVersion: number;
	newerVersion: number;
}

export interface HospitalHistory {
	compareList: HospitalCompareList;
}

export interface HospitalCompareList {
	hospital: CompareList[];
}

export const modelHospitalHistory: HospitalHistory = {
	compareList: {
		hospital: [],
	},
};
