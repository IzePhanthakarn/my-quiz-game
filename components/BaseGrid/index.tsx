import { SxProps } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import Pagination from "../Pagination";
import { PaginationOptions } from "../Pagination/redux/model";

interface Props {
	rows: any;
	columns: GridColDef[];
	label?: string;
	sx?: SxProps;
	page: PaginationOptions;
}

export default function BaseGrid(props: Props) {
	const { rows, columns, label, sx } = props;
	return (
		<div className="w-full">
			{label && (
				<div className="py-4">
					<p className="text-2xl">{label}</p>
				</div>
			)}
			<div className="h-[400px]">
				<DataGrid
					sx={{
						...sx,
						"&.MuiDataGrid-root": {
							borderWidth: "0px 0px 1px 0px",
						},
						"& .MuiDataGrid-columnSeparator--sideRight": {
							color: "transparent",
						},
					}}
					rows={rows}
					columns={columns}
					disableColumnFilter={true}
					disableColumnSelector={true}
					disableDensitySelector={true}
					disableColumnMenu={true}
					hideFooter={true}
				/>
			</div>
			<Pagination page={props.page} />
		</div>
	);
}
