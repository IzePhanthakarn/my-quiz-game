import { modelPaginationOptions } from "wcf-component-lib/src/components/BasePagination/model";
import { ClinicFilter, modelClinicFilter } from "./filter/model";
import { ClinicGrid } from "./master/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";

export interface Clinic {
	grid: ClinicGrid;
	clinicDetail: ClinicDetail;
	clinicFilter: ClinicFilter;
}

export const modelClinicDetail: ClinicDetail = {
	...baseMasterDataModel,
	clinicCode: "",
	clinicName: "",
};

export const modelClinic: Clinic = {
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
	clinicDetail: modelClinicDetail,
	clinicFilter: modelClinicFilter,
};
export interface ClinicDetail extends BaseMasterDataInterface {
	clinicCode: string;
	clinicName: string;
}
