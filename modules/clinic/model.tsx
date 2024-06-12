"use client";

import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE, STATUS } from "@/components/CustomGridCell/model";
import { GridColDef } from "@mui/x-data-grid/models";
import { LINKS } from "../../constants/links";
import StatusIndicator from "@/components/CustomGridCell/StatusIndicator";

export const columns: GridColDef[] = [
	{
		field: "isActive",
		headerName: "สถานะ",
		width: 60,
		align: "center",
		sortable: false,
		renderCell: (params) => {
			return <StatusIndicator status={params.row.isActive} />;
		},
	},
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
					editLink={LINKS.CLINIC.edit + params.row.clinicCode}
					viewLink={LINKS.CLINIC.view + params.row.clinicCode}
					mode={BUTTON_MODE.VIEW_EDIT_ICON}
				/>
			);
		},
	},
];
