import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
import { DiplomaList } from "./master/model";
import { DiplomaFilter, modelDiplomaFilter } from "./filter/model";
import { DiplomaDetail, modelDiaplomaDetail } from "./form/model";

export interface Diploma {
	grid: DiplomaGrid;
	diplomaDetail: DiplomaDetail;
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
		page: { ...modelPaginationOptions },
	},
	diplomaDetail: modelDiaplomaDetail,
	diplomaFilter: modelDiplomaFilter,
};
