import {
	modelPaginationOptions,
	PaginationModel,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface Med5009Form {
	propertyCode: string | null;
	propertyText: string;
	showDownload: string | null;
	downloadType: string | null;
}

export interface Med5009List {
	propertyCode: string;
}
export interface Med5009Grid extends PaginationModel {
	list: Med5009List[];
}

export interface Med5009 {
	form: Med5009Form;
	grid: Med5009Grid;
}

export const modelMed5009: Med5009 = {
	form: {
		propertyCode: null,
		propertyText: "",
		showDownload:null,
		downloadType:null,
	},
	grid: {
		list: [],
		page: { ...modelPaginationOptions },
	},
};
