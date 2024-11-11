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
	title: string;
	firstname: string;
	lastname: string;
	isActive: string;
	eDiploma: string;
	eHospital: string;
	diplomaTypeList: string[];
	provinceCodeList: string[];
	hospitalNameList: string[];
}
export interface DoctorGrid extends PaginationModel {
	list: DoctorList[];
}
