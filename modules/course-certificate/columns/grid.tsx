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
		width: 100,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		sorter: true,
		key: "courseCategory",
		dataIndex: "courseCategory",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"courseCategory"}
				label={"Course Category"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "ssoCourseCode",
		dataIndex: "ssoCourseCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"ssoCourseCode"}
				label={"Sso Course Code"}
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
				editLink={`${LINKS.CATEGORY_CERTIFICATE.edit}${uuid}`}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
