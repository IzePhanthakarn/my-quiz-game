export interface SortOrdersModel {
	direction: string;
	property: string;
}
export interface PaginationOptions {
	totalData: number;
	pageNumber: number;
	pageSize: number;
	orders?: SortOrdersModel[];
}

export interface PaginationModel {
	page: PaginationOptions;
}

export const modelPaginationOptions: PaginationOptions = {
	totalData: 0,
	pageNumber: 0,
	pageSize: 10,
};

export const modelPagination: PaginationModel = {
	page: {
		totalData: 0,
		pageNumber: 0,
		pageSize: 10,
	},
};
