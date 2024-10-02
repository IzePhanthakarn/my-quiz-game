import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { DoctorGrid } from "./master/model";
import { DoctorFilter, modelDoctorFilter } from "./filter/model";
import { DoctorForm, modelDoctorForm } from "./form/model";
import { CompareHistory, modelCompareHistory } from "./history/model";

export interface Doctor {
	grid: DoctorGrid;
	doctorForm: DoctorForm;
	doctorFilter: DoctorFilter;
	doctorCompareHistory: CompareHistory;
}

export const modelDoctor: Doctor = {
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
	doctorForm: modelDoctorForm,
	doctorFilter: modelDoctorFilter,
	doctorCompareHistory: modelCompareHistory,
};
