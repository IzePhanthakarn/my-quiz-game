"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "@/components/CustomGrid/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { names } from "../interfaces/names";

export const grid: TableProps["columns"] = [
	{
		title: "สถานะ",
		key: "isActive",
		dataIndex: "isActive",
		width: 150,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		sorter: true,
		key: "hospitalWcfCode",
		dataIndex: "hospitalWcfCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"hospitalWcfCode"}
				label={names.hospitalWcfCode}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "hospitalDbmsCode",
		dataIndex: "hospitalDbmsCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"hospitalDbmsCode"}
				label={names.hospitalDbmsCode}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "hospitalMinistryCode",
		dataIndex: "hospitalMinistryCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"hospitalMinistryCode"}
				label={names.hospitalMinistryCode}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "hospitalName",
		dataIndex: "hospitalName",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"hospitalName"}
				label={names.hospitalName}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		key: "uuid",
		title: "คำสั่ง",
		dataIndex: "uuid",
		render: (_, { uuid }) => (
			<CustomCellButton
				editLink={`${LINKS.HOSPITAL.edit}${uuid}`}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
