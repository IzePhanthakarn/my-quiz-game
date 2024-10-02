import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { Med5001, modelMed5001 } from "../Med5001/redux/model";
import { Med5005, modelMed5005 } from "../Med5005/redux/model";
import { Med5008, modelMed5008 } from "../Med5008/redux/model";
import { Med5009, modelMed5009 } from "../Med5009/redux/model";
import { Med5010, modelMed5010 } from "../Med5010/redux/model";
import { Med5011, modelMed5011 } from "../Med5011/redux/model";
import { Med5012, modelMed5012 } from "../Med5012/redux/model";

export interface MedReport {
	med5001: Med5001;
	med5005: Med5005;
	med5008: Med5008;
	med5009: Med5009;
	med5010: Med5010;
	med5011: Med5011;
	med5012: Med5012;
}

export const modelMedReport: MedReport = {
	med5001: modelMed5001,
	med5005: modelMed5005,
	med5008: modelMed5008,
	med5009: modelMed5009,
	med5010: modelMed5010,
	med5011: modelMed5011,
	med5012: modelMed5012,
};
