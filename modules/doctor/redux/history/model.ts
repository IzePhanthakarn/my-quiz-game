export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
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
	editTimes: number;
	updatedDate: string;
}

export const modelCompareHistory: CompareHistory = {
	filterList: [],
	compareList: {
		doctor: [],
		doctorAddress: [],
	},
};
