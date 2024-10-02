import { modelPaginationOptions, PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5001Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5001List {
	propertyCode: string;
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
		fromDate: null,
		toDate: null,
	},grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
