import { getCurrentDateString } from "@/utils";
import { ClinicForm, ClinicGrid, modelClinicForm } from "./infomation/model";

export interface Clinic {
	infomation: ClinicForm;
	grid: ClinicGrid[];
	clinicDetail: ClinicDetail;
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
