import { CompareList } from "../../../doctor/redux/history/model";

export interface HospitalHistory {
	compareList: HospitalCompareList;
	editTimesList: Array<number>;
	compareParams: FetchHospitalHistory;
}

export interface HospitalCompareList {
	hospital: CompareList[];
}

export interface FetchHospitalHistory {
	olderVersion: number | undefined;
	newerVersion: number | undefined;
}

export const modelHospitalHistory: HospitalHistory = {
	compareList: {
		hospital: [],
	},
	editTimesList: [],
	compareParams: {
		olderVersion: undefined,
		newerVersion: undefined,
	},
};
