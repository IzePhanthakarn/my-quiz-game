"use client";

import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGridCell/model";
import { GridColDef } from "@mui/x-data-grid/models";

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
					editLink={"clinic/form/" + params.row.clinicCode}
					viewLink={"clinic/form/" + params.row.clinicCode}
					mode={BUTTON_MODE.VIEW_EDIT_ICON}
				/>
			);
		},
	},
];
