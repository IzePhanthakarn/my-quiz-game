export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
	compareParams: CompareParams;
}

export interface CompareParams {
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
	olderValue: any;
	newerValue: any;
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
