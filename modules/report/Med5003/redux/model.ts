import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5003Form {
	ssoCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string | null;
}

export interface Med5003List {
}
export interface Med5003Grid extends PaginationModel {
	list: Med5003List[];
}

export interface Med5003 {
	form: Med5003Form;
	grid: Med5003Grid;
}

export const modelMed5003: Med5003 = {
	form: {
		ssoCode: null,
		fromDate: dayjs().format('YYYY-MM-DD'),
		toDate: dayjs().format('YYYY-MM-DD'),
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
