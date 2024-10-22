import dayjs from "dayjs";
import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5013Form {
	fromDate: string | null;
	toDate: string | null;
	ssoProject: string|null;
    checkSSO:boolean;
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
		fromDate: dayjs().format('YYYY-MM-DD'),
		toDate: dayjs().format('YYYY-MM-DD'),
		ssoProject: 'Y',
		checkSSO:true,
		showDownload: null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
