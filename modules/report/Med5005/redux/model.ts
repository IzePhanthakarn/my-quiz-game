import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5005Form {
	provinceCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string |null;
}

export interface Med5005List {
}

export interface Med5005 {
	form: Med5005Form;
	grid: Med5005Grid;
}
export interface Med5005Grid extends PaginationModel {
	list: Med5005List[];
}
export const modelMed5005: Med5005 = {
	form: {
		fromDate: null,
		toDate: null,
		provinceCode: null,
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
