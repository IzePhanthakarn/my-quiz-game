import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5001Form {
	ssoCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string | null;
}

export interface Med5001List {}

export interface Med5001 {
	form: Med5001Form;
	grid: Med5001Grid;
}
export interface Med5001Grid extends PaginationModel {
	list: Med5001List[];
}
export const modelMed5001: Med5001 = {
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
