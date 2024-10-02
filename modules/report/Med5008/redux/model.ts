import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5008Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5008List {
	fromDate: string | null;
	toDate: string | null;
}
export interface Med5008Grid extends PaginationModel {
	list: Med5008List[];
}

export interface Med5008 {
	form: Med5008Form;
	grid: Med5008Grid;
}

export const modelMed5008: Med5008 = {
	form: {
		fromDate: "",
		toDate: "",
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
