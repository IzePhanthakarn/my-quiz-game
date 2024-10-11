import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5005Form {
	provinceCode: string | null;
	trainFromDate: string | null;
	trainToDate: string | null;
	showDownload: string |null;
}

export interface Med5005List {
}

export interface Med5005 {
	form: Med5005Form;
	grid: Med5005Grid;
}
export interface Med5005Grid extends PaginationModel {
	list: Med5005List[];
}
export const modelMed5005: Med5005 = {
	form: {
		trainFromDate: dayjs().format('YYYY-MM-DD'),
		trainToDate: dayjs().format('YYYY-MM-DD'),
		provinceCode: null,
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
