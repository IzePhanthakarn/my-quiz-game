import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5010Form {
	hospitalType: string | null;
	hospitalCategory: string | null;
	ssoProject: string | null;
}

export interface Med5010List {
	hospitalType: string | null;
	hospitalCategory: string | null;
	ssoProject: string | null;
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
		hospitalType: "",
		hospitalCategory: "",
		ssoProject:"",
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
