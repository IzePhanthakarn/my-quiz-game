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
					headerKey={"hospitalWcfCode"}
					label={"รหัสโรงพยาบาล"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "hospitalWcfCode",
		key: "hospitalWcfCode",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"hospitalWcfName"}
					label={"ชื่อโรงพยาบาล"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "hospitalWcfName",
		key: "hospitalWcfName",
		sorter: true,
	},
	{
		title: (columns: ColumnTitleProps<any>) => (
			<div>
				<CustomHeaderSort
					columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
					headerKey={"jobType"}
					label={"jobType"}
					sort={columns?.sortColumns}
				/>
			</div>
		),
		dataIndex: "jobType",
		key: "jobType",
		sorter: true,
	},
];
