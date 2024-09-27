export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
	compareParams: compareParams;
}

export interface compareParams {
	doctorCode: string;
	edit1: string | number | null;
	edit2: string | number | null;
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
	compareParams: {
		doctorCode: "",
		edit1: null,
		edit2: null,
	},
};
