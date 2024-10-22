import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5002Form {
	ssoCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	doctorCode: string | null;
	showDownload: string | null;
}

export interface Med5002List {
}
export interface Med5002Grid extends PaginationModel {
	list: Med5002List[];
}

export interface Med5002 {
	form: Med5002Form;
	grid: Med5002Grid;
}

export const modelMed5002: Med5002 = {
	form: {
		ssoCode: null,
		fromDate: dayjs().format('YYYY-MM-DD'),
		toDate: dayjs().format('YYYY-MM-DD'),
		doctorCode: null,
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
