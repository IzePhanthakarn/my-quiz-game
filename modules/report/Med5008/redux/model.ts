import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5008Form {
	sp7expiredFrom: string | null;
	sp7expiredTo: string | null;
	sp19expiredFrom: string | null;
	sp19expiredTo: string | null;
	showDownload: string | null;
}

export interface Med5008List {
	sp7expiredFrom: string | null;
	sp7expiredTo: string | null;
	sp19expiredFrom: string | null;
	sp19expiredTo: string | null;
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
		sp7expiredFrom: "",
		sp7expiredTo: "",
		sp19expiredFrom: "",
		sp19expiredTo: "",
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
