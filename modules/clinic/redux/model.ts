import { ClinicFilter, modelClinicFilter } from "./filter/model";
import { ClinicForm, ClinicGrid, modelClinicForm } from "./master/model";

export interface Clinic {
	infomation: ClinicForm;
	grid: ClinicGrid[];
	clinicDetail: ClinicDetail;
	clinicFilter: ClinicFilter;
}

export const modelClinicDetail: ClinicDetail = {
	clinicCode: "",
	clinicName: "",
	createdBy: "",
	createdDate: "",
	isDeleted: "",
	updatedBy: "",
	updatedDate: "",
};

export const modelClinic: Clinic = {
	infomation: modelClinicForm,
	grid: [],
	clinicDetail: modelClinicDetail,
	clinicFilter: modelClinicFilter,
};
export interface ClinicDetail {
	clinicCode: String;
	clinicName: String;
	createdBy: String;
	createdDate: String;
	isDeleted: String;
	updatedBy: String;
	updatedDate: String;
}
