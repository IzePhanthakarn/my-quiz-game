import { PaginationModel } from "@/components/Pagination/redux/model";
import { DiplomaList } from "./master/model";

export interface Diploma {
	grid: DiplomaGrid;
}

export interface DiplomaForm {
	diplomaCode: string;
	diplomaName: string;
}

export interface DiplomaGrid extends PaginationModel {
	list: DiplomaList[];
}

export const modelDiploma: Diploma = {
	grid: {
		list: [],
		page: {
			pageSize: 10,
			pageNumber: 0,
			totalData: 0,
		},
	},
};
