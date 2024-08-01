import { IsActive } from "../../../constants/constants";
import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";

export interface LtProperties {
	grid: LtPropertiesGrid;
	filter: LtPropertiesFilter;
	form: LtPropertiesForm;
}

export interface LtPropertiesGrid extends PaginationModel {
	data: LtPropertiesGridData[];
}

export interface LtPropertiesGridData {
	propertyCode: string;
	groupName: string;
	propertyText: string;
	sortingOrder: number;
	description: string;

	createdBy: string;
	createdDate: string;
	isActive: string;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
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
export interface LtPropertiesForm {
	propertyCode: string;
	groupName: string;
	propertyText: string;
	sortingOrder: number;
	description: string;

	createdBy: string;
	createdDate: string;
	isActive: IsActive;
	updatedBy: string;
	updatedDate: string;
	uuid: string;
}

export const modelLtProperties: LtProperties = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
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

		isActive: undefined,
		checkIsActive: false,
	},
	form: {
		propertyCode: "",
		groupName: "",
		propertyText: "",
		sortingOrder: 0,
		description: "",

		createdBy: "",
		createdDate: "",
		isActive: IsActive.Y,
		updatedBy: "",
		updatedDate: "",
		uuid: "",
	},
};
