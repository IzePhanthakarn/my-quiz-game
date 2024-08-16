"use client";

import CustomCellButton from "@/components/CustomGrid/Cell/CustonCellButton";
import { BUTTON_MODE } from "@/components/CustomGrid/Cell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
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
		key: "amount",
		dataIndex: "amount",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"amount"}
				label={"Amount"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "fareAmount",
		dataIndex: "fareAmount",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"fareAmount"}
				label={"Fare Amount"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "amountLimit",
		dataIndex: "amountLimit",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"amountLimit"}
				label={"Amount Limit"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "startEffectiveDate",
		dataIndex: "startEffectiveDate",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"startEffectiveDate"}
				label={"Start Effective Date"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "notice",
		dataIndex: "notice",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"notice"}
				label={"Notice"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "endEffectiveDate",
		dataIndex: "endEffectiveDate",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"endEffectiveDate"}
				label={"End Effective Date"}
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
				editLink={`${LINKS.MEDICAL_AMOUNT.edit}${uuid}`}
				mode={BUTTON_MODE.VIEW_EDIT_ICON}
			/>
		),
	},
];
