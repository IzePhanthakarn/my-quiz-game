import { BaseCompareHistoryGrid } from "./model";

export interface TrainingHistoryCompare {
	newerGrid: TrainingCompareHistory[];
	olderGrid: TrainingCompareHistory[];
}

export interface TrainingCompareHistory extends BaseCompareHistoryGrid {
	trainingDate: string;
	trainingNo: string;
	trainingTime: string;
	trainingYear: string;
	id: number;
}

export const modelTrainingHistoryCompare: TrainingHistoryCompare = {
	newerGrid: [],
	olderGrid: [],
};
