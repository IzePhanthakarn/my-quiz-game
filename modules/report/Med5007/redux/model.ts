import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5007Form {
	hospitalCategory: string | null;
	propertyText: string;
}

export interface Med5007List {
	hospitalCategory: string;
}
export interface Med5007Grid extends PaginationModel {
	list: Med5007List[];
}

export interface Med5007 {
	form: Med5007Form;
	grid: Med5007Grid;
}

export const modelMed5007: Med5007 = {
	form: {
		hospitalCategory: null,
		propertyText: "",
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
