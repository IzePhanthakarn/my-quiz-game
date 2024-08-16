"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";

export const columns: TableProps["columns"] = [
	{
		title: "สถานะ",
		dataIndex: "isActive",
		key: "isActive",
		width: 150,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"doctorType"}
					label={"ประเภทแพทย์"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "doctorType",
		key: "doctorType",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"doctorCode"}
				label={"รหัสแพทย์"}
				sort={columns?.sortColumns}
			/>
		),
		dataIndex: "doctorCode",
		key: "doctorCode",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"firstname"}
				label={"ชื่อ-นามสกุล"}
				sort={columns?.sortColumns}
			/>
		),
		dataIndex: "firstname",
		key: "firstname",
		sorter: true,
		render: (_, { firstname, lastname }) => `${firstname} ${lastname}`,
	},
	{
		title: "คำสั่ง",
		dataIndex: "uuid",
		key: "uuid",
		render: (_, { uuid }) => (
			<CustomCellButton
				editLink={LINKS.DOCTOR.edit + uuid}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
