import { PaginationModel } from "@/components/Pagination/redux/model";
export interface BaseClinic {
	clinicCode: string;
	clinicName: string;
}
export interface ClinicForm extends BaseClinic {
	clinicCodeName: string;
	uuid: string;
}

export interface ClinicList extends ClinicForm {
	id: string;
	isActive: string;
}
export interface ClinicGrid extends PaginationModel {
	list: ClinicList[];
}

export const modelClinicForm: ClinicForm = {
	clinicCodeName: "",
	clinicCode: "",
	clinicName: "",
	uuid: "",
};
