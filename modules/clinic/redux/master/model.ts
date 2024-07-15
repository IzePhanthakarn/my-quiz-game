import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";
export interface BaseClinic {
	clinicCode: string;
	clinicName: string;
	uuid: string;
}
export interface ClinicForm extends BaseClinic {
	clinicCodeName: string;
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
