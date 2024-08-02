import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { DoctorGrid } from "./master/model";
import { DoctorFilter, modelDoctorFilter } from "./filter/model";

export interface Doctor {
	grid: DoctorGrid;
	// doctorDetail: DoctorDetail;
	doctorFilter: DoctorFilter;
}

export const modelDoctor: Doctor = {
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
	doctorFilter: modelDoctorFilter,
};
