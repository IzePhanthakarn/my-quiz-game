import { BaseCompareHistoryGrid, CompareRelationHistory } from "./model";

export interface DoctorDetailHistoryCompare {
	newerGrid: DoctorDetailCompareHistory[];
	olderGrid: DoctorDetailCompareHistory[];
}

export interface DoctorDetailCompareHistory extends BaseCompareHistoryGrid {
	diplomaType: string;
	id: number;
}

export const modelDoctorDetailHistoryCompare: DoctorDetailHistoryCompare = {
	newerGrid: [],
	olderGrid: [],
};
