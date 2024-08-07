import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
import { DiplomaList } from "./master/model";
import { DiplomaFilter, modelDiplomaFilter } from "./filter/model";
import { modelDiaplomaDetail } from "./form/model";
import { BaseMasterDataInterface } from "wcf-component-lib/src/interfaces/base-master-data-interface";

export interface Diploma {
	grid: DiplomaGrid;
	diplomaDetail: DiplomaForm;
	diplomaFilter: DiplomaFilter;
}

export interface DiplomaForm extends BaseMasterDataInterface {
	diplomaType: string;
	diplomaName: string;
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
