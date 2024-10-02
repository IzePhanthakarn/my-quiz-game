export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
	compareParams: compareParams;
}

export interface compareParams {
	doctorCode: string;
	olderVersion: number | null;
	newerVersion: number | null;
}

export interface DoctorCompareList {
	doctor: CompareList[];
	doctorAddress: CompareList[];
}

export interface CompareList {
	name: string;
	value1: any;
	value2: any;
	isChanged: boolean;
}

export interface FilterList {
	label: string;
	updatedBy: string;
	editTimes: string;
	updatedDate: string;
}

export const modelCompareHistory: CompareHistory = {
	filterList: [],
	compareList: {
		doctor: [],
		doctorAddress: [],
	},
	compareParams: {
		doctorCode: "",
		olderVersion: null,
		newerVersion: null,
	},
};
