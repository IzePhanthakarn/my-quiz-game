export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
	compareParams: CompareParams;
	compareListAll: CompareAllList[];
}

export interface CompareParams {
	doctorId: number;
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

export interface CompareAllList {
	name: string;
	olderValue: any;
	newerValue: any;
	isChanged: boolean;
	updatedBy: string;
	updatedDate: string;
	editTimes: number;
	field: string;
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
		doctorId: 0,
		olderVersion: null,
		newerVersion: null,
	},
	compareListAll: [],
};
