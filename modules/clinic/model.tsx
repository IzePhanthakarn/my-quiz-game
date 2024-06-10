"use client";

import CustomCellStatus from "@/components/CustomGridCell/CustomCellStatus";
import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE, STATUS } from "@/components/CustomGridCell/model";
import { getStatusBgColor } from "@/components/CustomGridCell/service";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";
import { LINKS } from "../../constants/links";

export const columns: GridColDef[] = [
	{ field: "clinicName", headerName: "ชื่อคลินิค", width: 400 },
	{
		field: "clinicCode",
		headerName: "รหัสคลินิค",
		width: 150,
		sortable: true,
	},
	{
		field: "action",
		headerName: "คำสั่ง",
		width: 200,
		renderCell: (params) => {
			return (
				<CustomCellButton
					editLink={LINKS.CLINIC.edit + params.row.clinicCode}
					viewLink={LINKS.CLINIC.view + params.row.clinicCode}
					mode={BUTTON_MODE.VIEW_EDIT_ICON}
				/>
			);
		},
	},
];
