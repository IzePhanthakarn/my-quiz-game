import { modelPaginationOptions, PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5001Form {
	provinceCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string | null;
}

export interface Med5001List {
	provinceCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string | null;
}

export interface Med5001 {
	form: Med5001Form;
	grid: Med5001Grid;
}
export interface Med5001Grid extends PaginationModel {
	list: Med5001List[];
}
export const modelMed5001: Med5001 = {
	form: {
		provinceCode: null,
		fromDate: null,
		toDate: null,
		showDownload: null,
	},grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
