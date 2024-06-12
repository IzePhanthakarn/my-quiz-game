import { SxProps } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import Pagination from "../Pagination";

interface Props {
	rows: any;
	columns: GridColDef[];
	label?: string;
	sx?: SxProps;
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
				autoHeight
				rows={rows}
				columns={columns}
				disableColumnFilter={true}
				disableColumnSelector={true}
				disableDensitySelector={true}
				disableColumnMenu={true}
				hideFooter={true}
			/>
			<Pagination />
		</div>
	);
}
