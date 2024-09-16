import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { Med5009, modelMed5009 } from "../Med5009/redux/model";

export interface MedReport {
	med5009: Med5009;
}

export const modelMedReport: MedReport = {
	med5009: modelMed5009,
};
