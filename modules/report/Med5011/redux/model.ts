import { modelPaginationOptions, PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5011Form {
	fromDate: string | null;
	toDate: string | null;
	showDownload:string|null;
}

export interface Med5011List {
}

export interface Med5011 {
	form: Med5011Form;
	grid: Med5011Grid;
}

export interface Med5011Grid extends PaginationModel {
	list: Med5011List[];
}

export const modelMed5011: Med5011 = {
	form: {
		fromDate: null,
		toDate: null,
		showDownload:null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
