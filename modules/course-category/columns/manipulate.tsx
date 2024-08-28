"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import ExtraRouter from "@/utils/function-component/ExtraRouter";

export const columns: TableProps["columns"] = [
	{
		title: "สถานะ",
		key: "isActive",
		dataIndex: "isActive",
		width: 150,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
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
		sorter: true,
		key: "categorySubDesc",
		dataIndex: "categorySubDesc",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"categorySubDesc"}
				label={"Description"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "courseCategory",
		dataIndex: "courseCategory",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"courseCategory"}
				label={"Description"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		key: "uuid",
		title: "คำสั่ง",
		dataIndex: "uuid",
		render: (_, { uuid }) => {
			const router = ExtraRouter();
			return (
				<CustomCellButton
					editFunction={() => router.push(LINKS.COURSE_CATEGORY.edit + uuid)}
					mode={BUTTON_MODE.EDIT_ONLY_ICON}
				/>
			);
		},
	},
];
