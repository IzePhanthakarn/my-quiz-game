import {
	DoctorDetailHistoryCompare,
	modelDoctorDetailHistoryCompare,
} from "./doctor-detail";

export interface CompareHistory {
	filterList: FilterList[];
	compareList: DoctorCompareList;
	compareParams: CompareParams;
	compareListAll: CompareAllList[];
}

export interface BaseCompareHistoryGrid {
	isNew: boolean;
	isDeleted: boolean;
	isChanged: boolean;
}

export interface CompareParams {
	doctorId: number;
	doctorCode: string;
	olderVersion: number | null;
	newerVersion: number | null;
}

export interface DoctorCompareList {
	doctor: CompareList[];
	doctorAddress: CompareList[];
	relationHistory: CompareRelationHistory;
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

export interface CompareRelationHistory {
	doctorDetailHistoryCompare: DoctorDetailHistoryCompare;
}

export const modelCompareList: DoctorCompareList = {
	doctor: [],
	doctorAddress: [],
	relationHistory: {
		doctorDetailHistoryCompare: modelDoctorDetailHistoryCompare,
	},
};

export const modelCompareHistory: CompareHistory = {
	filterList: [],
	compareList: modelCompareList,
	compareParams: {
		doctorId: 0,
		doctorCode: "",
		olderVersion: null,
		newerVersion: null,
	},
	compareListAll: [],
};
