import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";
export interface BaseDoctor {
	doctorType: string;
	doctorCode: string;
	uuid: string;
}

export interface DoctorList {
	professionalCode: string;
	doctorCode: string;
	uuid: string;
	id: string;
	firstname: string;
	lastname: string;
	isActive: string;
	diplomaTypeList: string[];
	provinceCodeList: string[];
	hospitalNameList: string[];
}
export interface DoctorGrid extends PaginationModel {
	list: DoctorList[];
}
