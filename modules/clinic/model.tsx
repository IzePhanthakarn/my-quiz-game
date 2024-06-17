"use client";

import CustomCellButton from "@/components/CustomGridCell/CustonCellButton";
import { BUTTON_MODE, STATUS } from "@/components/CustomGridCell/model";
import { LINKS } from "../../constants/links";
import StatusIndicator from "@/components/CustomGridCell/StatusIndicator";
import { TableProps } from "antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "สถานะ",
		dataIndex: "isActive",
		key: "id",
		width: 100,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		title: "รหัสคลินิค",
		dataIndex: "clinicCode",
		key: "id",
	},
	{
		title: "ชื่อคลินิค",
		dataIndex: "clinicName",
		key: "id",
	},
	{
		title: "คำสั่ง",
		dataIndex: "uuid",
		key: "id",

		render: (_, { uuid }) => (
			<CustomCellButton
				editLink={LINKS.CLINIC.edit + uuid}
				viewLink={LINKS.CLINIC.view + uuid}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
