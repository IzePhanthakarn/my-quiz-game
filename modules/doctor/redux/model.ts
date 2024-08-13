import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { DoctorGrid } from "./master/model";
import { DoctorFilter, modelDoctorFilter } from "./filter/model";
import { DoctorForm, modelDoctorForm } from "./form/model";

export interface Doctor {
	grid: DoctorGrid;
	doctorForm: DoctorForm;
	doctorFilter: DoctorFilter;
}

export const modelDoctor: Doctor = {
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
	doctorForm: modelDoctorForm,
	doctorFilter: modelDoctorFilter,
};
