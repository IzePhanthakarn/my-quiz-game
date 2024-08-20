"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";

export const columns: TableProps["columns"] = [
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"bankAccount"}
					label={"bankAccount"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "bankAccount",
		key: "bankAccount",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"bankDigitCode"}
					label={"bankDigitCode"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "bankDigitCode",
		key: "bankDigitCode",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"bankSortingCode"}
					label={"bankSortingCode"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "bankSortingCode",
		key: "bankSortingCode",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"bankAccount"}
					label={"bankAccount"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "bankAccount",
		key: "bankAccount",
		sorter: true,
	},
];
