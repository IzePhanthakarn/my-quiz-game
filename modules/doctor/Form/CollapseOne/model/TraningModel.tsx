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
					headerKey={"trainingNo"}
					label={"trainingNo"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "trainingNo",
		key: "trainingNo",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"trainingDate"}
					label={"trainingDate"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "trainingDate",
		key: "trainingDate",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"trainingYear"}
					label={"trainingYear"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "trainingYear",
		key: "trainingYear",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"trainingTime"}
					label={"trainingTime"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "trainingTime",
		key: "trainingTime",
		sorter: true,
	},
];
