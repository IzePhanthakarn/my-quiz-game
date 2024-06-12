"use client";

import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE, STATUS } from "@/components/CustomGridCell/model";
import { GridColDef } from "@mui/x-data-grid/models";
import { LINKS } from "../../constants/links";

export const columns: GridColDef[] = [
	{ field: "clinicName", headerName: "ชื่อคลินิค", flex: 1 },
	{
		field: "clinicCode",
		headerName: "รหัสคลินิค",
		flex: 1,
	},
	{
		field: "action",
		headerName: "คำสั่ง",
		flex: 1,
		renderCell: (params) => {
			return (
				<CustomCellButton
					editLink={LINKS.CLINIC.edit + params.row.uuid}
					viewLink={LINKS.CLINIC.view + params.row.uuid}
					mode={BUTTON_MODE.VIEW_EDIT_ICON}
				/>
			);
		},
	},
];
