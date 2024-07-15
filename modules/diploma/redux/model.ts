import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";
import { DiplomaList } from "./master/model";
import { DiplomaFilter, modelDiplomaFilter } from "./filter/model";

export interface Diploma {
	grid: DiplomaGrid;
	diplomaFilter: DiplomaFilter;
}

export interface DiplomaForm {
	diplomaType: string;
	diplomaName: string;
	uuid: string;
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
	diplomaFilter: modelDiplomaFilter,
};
