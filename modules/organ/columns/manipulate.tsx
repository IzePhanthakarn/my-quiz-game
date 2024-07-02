"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "@/components/CustomGrid/Cell/StatusIndicator";
import { TableProps } from "antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "antd/es/table/interface";
import { LINKS } from "@/constants/links";

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
				editLink={LINKS.ORGAN.edit + uuid}
				viewLink={LINKS.ORGAN.view + uuid}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
