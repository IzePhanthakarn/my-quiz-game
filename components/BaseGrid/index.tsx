import { SxProps } from "@mui/material/styles";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import React from "react";
import Pagination from "../Pagination";
import { PaginationOptions } from "../Pagination/redux/model";
import Table, { TableProps } from "antd/es/table";

interface Props {
	rows: any;
	columns: TableProps["columns"];
	label?: string;
	sx?: SxProps;
	page: PaginationOptions;
	onSortModelChange?: (sortModel: GridSortModel) => void;
	loading?: boolean;
}

export default function BaseGrid(props: Props) {
	const {
		rows,
		columns,
		label,
		sx,
		onSortModelChange = (sortModel: GridSortModel) => {},
		loading = false,
	} = props;
	return (
		<div className="w-full">
			{label && (
				<div className="py-4">
					<p className="text-2xl">{label}</p>
				</div>
			)}
			<div className="h-[400px]">
				<Table dataSource={rows} columns={columns} scroll={{ y: 400 }} />
			</div>
			{/* <Pagination page={props.page} /> */}
		</div>
	);
}
