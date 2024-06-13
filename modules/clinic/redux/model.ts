import { IsDelete } from "../../../constants/constants";
import { ClinicFilter, modelClinicFilter } from "./filter/model";
import { ClinicForm, ClinicGrid, modelClinicForm } from "./master/model";

export interface Clinic {
	infomation: ClinicForm;
	grid: ClinicGrid[];
	clinicDetail: ClinicDetail;
	clinicDetailError: ClinicDetailError;
	clinicFilter: ClinicFilter;
}

export const modelClinicDetail: ClinicDetail = {
	clinicCode: "",
	// clinicCodeError: "",
	clinicName: "",
	createdBy: "",
	createdDate: "",
	// isDeleted: IsDelete.N,
	isActive: IsDelete.Y,
	updatedBy: "",
	updatedDate: "",
	uuid: "",
};

export const modelClinicDetailError: ClinicDetailError = {
	clinicCode: "",
};

export const modelClinic: Clinic = {
	infomation: modelClinicForm,
	grid: [],
	clinicDetail: modelClinicDetail,
	clinicDetailError: modelClinicDetailError,
	clinicFilter: modelClinicFilter,
};
export interface ClinicDetail {
	clinicCode: string;
	// clinicCodeError: string;
	clinicName: string;
	createdBy: string;
	createdDate: string;
	// isDeleted: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export interface ClinicDetailError {
	clinicCode: string;
}
