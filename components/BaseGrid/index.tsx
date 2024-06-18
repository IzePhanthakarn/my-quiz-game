import React from "react";
import BasePagination from "../Pagination";
import { PaginationOptions } from "../Pagination/redux/model";
import Table, { TableProps } from "antd/es/table";
import {
	TableCurrentDataSource,
	SorterResult,
	FilterValue,
	TablePaginationConfig,
} from "antd/es/table/interface";

interface Props {
	rows: any;
	columns: TableProps["columns"];
	label?: string;
	page: PaginationOptions;
	loading?: boolean;
}

export default function BaseGrid(props: Props) {
	const { rows, columns, label, loading = false, page } = props;

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<any>
	) => {
		console.log("nitnitnti");
	};

	return (
		<div className="w-full">
			{label && (
				<div className="py-4">
					<p className="text-2xl">{label}</p>
				</div>
			)}
			<Table
				dataSource={rows}
				loading={loading}
				columns={columns}
				scroll={{ y: 400 }}
				pagination={false}
			/>
			<BasePagination page={page} />
		</div>
	);
}
function onSort(arg0: string, arg1: string) {
	throw new Error("Function not implemented.");
}
