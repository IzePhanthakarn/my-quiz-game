"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import ExtraRouter from "@/utils/function-component/ExtraRouter";

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
		key: "organSystemGroup",
		dataIndex: "organSystemGroup",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"organSystemGroup"}
				label={"Organ System Group"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "organSystemNo",
		dataIndex: "organSystemNo",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"organSystemNo"}
				label={"Organ System No"}
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
					editFunction={() =>
						router.push(LINKS.COURSE_ORGAN_SYSTEM_GROUP.edit + uuid)
					}
					mode={BUTTON_MODE.EDIT_ONLY_ICON}
				/>
			);
		},
	},
];
