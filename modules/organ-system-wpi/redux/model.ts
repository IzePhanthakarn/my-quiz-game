import {
	PaginationModel,
	PaginationOptions,
} from "wcf-component-lib/src/components/BasePagination/model";
import { IsActive } from "../../../constants/constants";

export interface OrganSystemWpi {
	grid: OrganSystemWpiGrid;
	filter: OrganSystemWpiFilter;
	form: OrganSystemWpiForm;
}

export interface OrganSystemWpiGrid extends PaginationModel {
	data: OrganSystemWpiGridData[];
}

export type GetOrganSystemWpiList = OrganSystemWpiFilter & PaginationOptions;

export interface OrganSystemWpiGridData {
	createdDate: string;
	createdBy: string;
	updatedDate: string;
	updatedBy: string;
	isActive: string;
	uuid: string;
	systemId: number;
	organSystemNo: number;
	description: string;
}

export interface OrganSystemWpiFilter {
	organSystemNoLike: string;
	descriptionLike: string;

	checkOrganSystemNo: boolean;
	checkDescription: boolean;

	isActive: IsActive;
}

export interface OrganSystemWpiForm {
	organSystemNo: string;
	description: string;
	createdDate: string;
	createdBy: string;
	updatedDate: string;
	updatedBy: string;
	isActive: IsActive;
	uuid: string;
}

export const modelOrganSystemWpi: OrganSystemWpi = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		organSystemNoLike: "",
		descriptionLike: "",
		checkOrganSystemNo: false,
		checkDescription: false,
		isActive: IsActive.Y,
	},
	form: {
		createdDate: "",
		createdBy: "",
		updatedDate: "",
		updatedBy: "",
		isActive: IsActive.Y,
		uuid: "",
		organSystemNo: "",
		description: "",
	},
};
