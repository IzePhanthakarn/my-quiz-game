import {
	modelPaginationOptions,
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "wcf-component-lib/src/constants/constants";
import {
	BaseMasterDataInterface,
	baseMasterDataModel,
} from "wcf-component-lib/src/interfaces/base-master-data-interface";
export interface OrganSystemWpi {
	grid: OrganSystemWpiGrid;
	filter: OrganSystemWpiFilter;
	form: OrganSystemWpiForm;
}

export interface OrganSystemWpiGrid extends PaginationModel {
	data: OrganSystemWpiGridData[];
}
export interface GetOrganSystemWpiList extends OrganSystemWpiFilter {
	pagination: PaginationOptions;
}
export interface OrganSystemWpiGridData extends BaseMasterDataInterface {
	systemId: number;
	organSystemNo: number;
	description: string;
}

export interface OrganSystemWpiFilter {
	organSystemNoLike: string;
	descriptionLike: string;

	checkOrganSystemNo: boolean;
	checkDescription: boolean;
	isActive: IsActive | undefined;
	checkIsActive: boolean;
}

export interface OrganSystemWpiForm extends BaseMasterDataInterface {
	organSystemNo: string;
	description: string;
}

export const modelOrganSystemWpiFilter: OrganSystemWpiFilter = {
	organSystemNoLike: "",
	descriptionLike: "",
	checkOrganSystemNo: false,
	checkDescription: false,
	isActive: IsActive.Y,
	checkIsActive: false,
};

export const modelOrganSystemWpi: OrganSystemWpi = {
	grid: {
		data: [],
		page: {
			...modelPaginationOptions,
		},
	},
	filter: modelOrganSystemWpiFilter,
	form: {
		...baseMasterDataModel,
		organSystemNo: "",
		description: "",
	},
};
