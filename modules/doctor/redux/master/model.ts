import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";
export interface BaseDoctor {
	doctorType: string;
	doctorCode: string;
	uuid: string;
}

export interface DoctorList {
	doctorType: any;
	doctorCode: any;
	uuid: any;
	id: string;
	firstname: string;
	lastname: string;
	isActive: string;
}
export interface DoctorGrid extends PaginationModel {
	list: DoctorList[];
}
