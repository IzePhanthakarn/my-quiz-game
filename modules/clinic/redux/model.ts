import { IsDelete } from "../../../constants/constants";
import { ClinicFilter, modelClinicFilter } from "./filter/model";
import { ClinicForm, ClinicGrid, modelClinicForm } from "./master/model";

export interface Clinic {
	infomation: ClinicForm;
	grid: ClinicGrid;
	clinicDetail: ClinicDetail;
	clinicFilter: ClinicFilter;
}

export const modelClinicDetail: ClinicDetail = {
	clinicCode: "",
	clinicName: "",
	createdBy: "",
	createdDate: "",
	// isDeleted: IsDelete.N,
	isActive: IsDelete.Y,
	updatedBy: "",
	updatedDate: "",
	uuid: "",
};

export const modelClinic: Clinic = {
	infomation: modelClinicForm,
	grid: { list: [], page: { pageSize: 10, pageNumber: 0, totalData: 0 } },
	clinicDetail: modelClinicDetail,
	clinicFilter: modelClinicFilter,
};
export interface ClinicDetail {
	clinicCode: string;
	clinicName: string;
	createdBy: string;
	createdDate: string;
	// isDeleted: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}
