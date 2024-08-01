"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "@/components/CustomGrid/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";

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
		key: "propertyCode",
		dataIndex: "propertyCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"propertyCode"}
				label={"Propterty Code"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "groupName",
		dataIndex: "groupName",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"groupName"}
				label={"Group Name"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "propertyText",
		dataIndex: "propertyText",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"propertyText"}
				label={"Propterty Text"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "sortingOrder",
		dataIndex: "sortingOrder",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"sortingOrder"}
				label={"Sorting Order"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "description",
		dataIndex: "description",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"description"}
				label={"Description"}
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
				editLink={`${LINKS.LT_PROPERTIES.edit}${uuid}`}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
