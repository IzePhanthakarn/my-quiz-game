import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5010Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5010List {
	fromDate: string | null;
	toDate: string | null;
}
export interface Med5010Grid extends PaginationModel {
	list: Med5010List[];
}

export interface Med5010 {
	form: Med5010Form;
	grid: Med5010Grid;
}

export const modelMed5010: Med5010 = {
	form: {
		fromDate: "",
		toDate: "",
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
