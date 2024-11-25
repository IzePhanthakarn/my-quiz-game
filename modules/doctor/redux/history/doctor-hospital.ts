import { BaseCompareHistoryGrid } from "./model";

export interface DoctorHospitalHistoryCompare {
	newerGrid: DoctorHospitalCompareHistory[];
	olderGrid: DoctorHospitalCompareHistory[];
}

export interface DoctorHospitalCompareHistory extends BaseCompareHistoryGrid {
	hospitalWcfCode: string;
	jobType: string;
	position: string;
	hospitalWcfName: string;
	id: number;
}

export const modelDoctorHospitalHistoryCompare: DoctorHospitalHistoryCompare = {
	newerGrid: [],
	olderGrid: [],
};
