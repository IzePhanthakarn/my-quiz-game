import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5012 {
	form: Med5012Form;
	grid: Med5012Grid;
}

export interface Med5012Form {
	toDate: string;
	fromDate: string;
}

export interface Med5012List {
	hospitalWcfCode: string;
	hospitalType: string;
	hospitalTypeText: string;
	inspecType: string;
	hospitalCategoryText: string;
	itemNo: number;
	hospitalName: string;
	provinceName: string;
	inspecTypeText: null;
	hospitalCategory: string;
}

export interface Med5012Grid extends PaginationModel {
	list: Med5012List[];
}

export const modelMed5012: Med5012 = {
	form: {
		toDate: "",
		fromDate: "",
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
