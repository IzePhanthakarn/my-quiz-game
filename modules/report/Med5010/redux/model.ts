import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";
export interface Med5010Form {
	fromDate: string | null;
	toDate: string | null;
}

export interface Med5010List {
	propertyCode: string;
}

export interface Med5010 {
	form: Med5010Form;
	list: Med5010List[];
}

export const modelMed5010: Med5010 = {
	form: {
		fromDate: null,
		toDate: null,
	},
	list: [],
};
