import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";
export interface BaseDoctor {
	doctorType: string;
	doctorCode: string;
	uuid: string;
}
export interface DoctorForm extends BaseDoctor {
	doctorTypeCode: string;
}

export interface DoctorList extends DoctorForm {
	id: string;
	firstname: string;
	lastname: string;
	isActive: string;
}
export interface DoctorGrid extends PaginationModel {
	list: DoctorList[];
}

export const modelDoctorForm: DoctorForm = {
	doctorTypeCode: "",
	doctorType: "",
	doctorCode: "",
	uuid: "",
};
