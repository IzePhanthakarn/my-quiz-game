import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5013Form {
	provinceCode: string | null;
	trainFromDate: string | null;
	trainToDate: string | null;
	showDownload: string |null;
}

export interface Med5013List {
}

export interface Med5013 {
	form: Med5013Form;
	grid: Med5013Grid;
}
export interface Med5013Grid extends PaginationModel {
	list: Med5013List[];
}
export const modelMed5013: Med5013 = {
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
