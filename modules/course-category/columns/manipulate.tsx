"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "@/components/CustomGrid/Cell/StatusIndicator";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { LINKS } from "@/constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";

export const columns: TableProps["columns"] = [
	{
		title: "สถานะ",
		key: "isActive",
		dataIndex: "isActive",
		width: 100,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		sorter: true,
		key: "courseCategoryId",
		dataIndex: "courseCategoryId",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"courseCategoryId"}
				label={"Course Category Id"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "categoryDescription",
		dataIndex: "categoryDescription",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"categoryDescription"}
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
				editLink={`${LINKS.CATEGORY_COURSE.edit}${uuid}`}
				viewLink={`${LINKS.CATEGORY_COURSE.edit}${uuid}`}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
