import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
export interface Document {
	grid: DocumentGrid;
	filter: DocumentFilter;
	form: DocumentForm;
}

export interface DocumentGrid extends PaginationModel {
	data: DocumentGridData[];
}

export interface DocumentGridData extends BaseMasterDataInterface {
	documentName: string;
	remark: string | null;
	isNecessary: string;
	disabled: string | null;
}

export interface DocumentFilter {
	documentNameLike: string | null;
	// remark: string | null;
	isNecessary: string | null;
	disabled: string | null;

	checkDocumentName: boolean;
	// checkRemark: boolean;
	checkIsNecessary: boolean;
	checkDisabled: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetDocumentList extends DocumentFilter {
	pagination: PaginationOptions;
}
export interface DocumentForm extends BaseMasterDataInterface {
	documentName: string;
	remark: string;
	isNecessary: string;
	disabled: string;
}

export const modelDocument: Document = {
	grid: {
		data: [],
		page: { ...modelPaginationOptions },
	},
	filter: {
		documentNameLike: null,
		// remark: "",
		isNecessary: null,
		disabled: null,

		checkDocumentName: false,
		// checkRemark: false,
		checkIsNecessary: false,
		checkDisabled: false,

		isActive: undefined,
		checkIsActive: false,
	},
	form: {
		...baseMasterDataModel,
		documentName: "",
		remark: "",
		isNecessary: "",
		disabled: "",
	},
};
