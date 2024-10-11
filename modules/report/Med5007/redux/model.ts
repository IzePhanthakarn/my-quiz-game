import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5007Form {
	hospitalType: string | null;
	hospitalCategory: string | null;
	showDownload: string |null;
	downloadType: string | null;
}

export interface Med5007List {
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
		hospitalType: "",
		hospitalCategory: "",
		showDownload:"",
		downloadType:null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
