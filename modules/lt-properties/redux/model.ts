import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
export interface LtProperties {
	grid: LtPropertiesGrid;
	filter: LtPropertiesFilter;
	form: LtPropertiesForm;
}

export interface LtPropertiesGrid extends PaginationModel {
	data: LtPropertiesGridData[];
}

export interface LtPropertiesGridData extends BaseMasterDataInterface {
	propertyCode: string;
	groupName: string;
	propertyText: string;
	sortingOrder: number;
	description: string;
}

export interface LtPropertiesFilter {
	propertyCodeLike: string;
	groupNameLike: string;
	propertyTextLike: string;
	sortingOrder: number;
	descriptionLike: string | null;

	checkProptertyCode: boolean;
	checkGroupName: boolean;
	checkProptertyText: boolean;
	checkSortingOrder: boolean;
	checkDescription: boolean;

	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface GetLtPropertiesList extends LtPropertiesFilter {
	pagination: PaginationOptions;
}
export interface LtPropertiesForm extends BaseMasterDataInterface {
	propertyCode: string;
	groupName: string;
	propertyText: string;
	sortingOrder: number;
	description: string;
}

export const modelLtPropertiesFilter: LtPropertiesFilter = {
	propertyCodeLike: "",
	groupNameLike: "",
	propertyTextLike: "",
	sortingOrder: 0,
	descriptionLike: "",

	checkProptertyCode: false,
	checkGroupName: false,
	checkProptertyText: false,
	checkSortingOrder: false,
	checkDescription: false,

	isActive: IsActive.Y,
	checkIsActive: false,
};

export const modelLtProperties: LtProperties = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: modelLtPropertiesFilter,
	form: {
		...baseMasterDataModel,
		propertyCode: "",
		groupName: "",
		propertyText: "",
		sortingOrder: 0,
		description: "",
	},
};
