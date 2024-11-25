import { BaseCompareHistoryGrid } from "./model";

export interface DoctorBankHistoryCompare {
	newerGrid: DoctorBankCompareHistory[];
	olderGrid: DoctorBankCompareHistory[];
}

export interface DoctorBankCompareHistory extends BaseCompareHistoryGrid {
	bankDigitCode: string;
	bankSortingCode: string;
	bankAccount: string;
	bankAccountName: string;
	promptpay: string;
	id: number;
}

export const modelDoctorBankHistoryCompare: DoctorBankHistoryCompare = {
	newerGrid: [],
	olderGrid: [],
};
