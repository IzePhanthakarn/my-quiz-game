import { Med5009, modelMed5009 } from "../Med5009/redux/model";
import { Med5012, modelMed5012 } from "../Med5012/redux/model";
import { Med5007, modelMed5007 } from "../Med5007/redux/model";

export interface MedReport {
	med5007: Med5007,
	med5009: Med5009;
	med5012: Med5012;
}

export const modelMedReport: MedReport = {
	med5007: modelMed5007,
	med5009: modelMed5009,
	med5012: modelMed5012,
};
