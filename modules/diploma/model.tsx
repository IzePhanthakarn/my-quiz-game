"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "@/components/CustomGrid/Cell/StatusIndicator";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";

export const columns: TableProps["columns"] = [
	{
		title: "สถานะ",
		dataIndex: "isActive",
		key: "isActive",
		width: 100,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"diplomaType"}
					label={"รหัสคลินิค"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "diplomaType",
		key: "diplomaType",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"diplomaName"}
				label={"ชื่อคลินิค"}
				sort={columns?.sortColumns}
			/>
		),
		dataIndex: "diplomaName",
		key: "diplomaName",
		sorter: true,
	},
	{
		title: "คำสั่ง",
		dataIndex: "uuid",
		key: "uuid",
		render: (_, { uuid }) => (
			<CustomCellButton
				editLink={LINKS.DIPLOMA.edit + uuid}
				viewLink={LINKS.DIPLOMA.view + uuid}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
