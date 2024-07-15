import { PaginationModel } from "wcf-component-lib/src/components/BasePagination/model";

export interface OrganManipulate {
	grid: OrganManipulateGrid;
	filter: OrganManipulateFilter;
	form: OrganManipulateForm;
}

export interface OrganManipulateGrid extends PaginationModel {
	data: OrganManipulateGridData[];
}

export interface OrganManipulateGridData {
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

export interface OrganManipulateFilter {
	id: string;
}

export interface OrganManipulateForm {
	systemId: number;
	organSystemNo: number;
	description: string;
}

export const modelOrganManipulate: OrganManipulate = {
	grid: {
		data: [],
		page: {
			totalData: 0,
			pageNumber: 0,
			pageSize: 10,
		},
	},
	filter: {
		id: "",
	},
	form: {
		systemId: 0,
		organSystemNo: 0,
		description: "",
	},
};
