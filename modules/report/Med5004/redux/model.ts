import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5004Form {
	ssoCode: string | null;
	fromDate: string | null;
	toDate: string | null;
	showDownload: string | null;
}

export interface Med5004List {
}
export interface Med5004Grid extends PaginationModel {
	list: Med5004List[];
}

export interface Med5004 {
	form: Med5004Form;
	grid: Med5004Grid;
}

export const modelMed5004: Med5004 = {
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
