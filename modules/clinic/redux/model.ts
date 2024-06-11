import { IsDelete } from "../../../constants/constants";
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
	isDeleted: IsDelete.N,
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
	clinicCode: string;
	clinicName: string;
	createdBy: string;
	createdDate: string;
	isDeleted: string;
	updatedBy: string;
	updatedDate: string;
}
