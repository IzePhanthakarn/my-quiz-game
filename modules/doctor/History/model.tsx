"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ลำดับ",
		dataIndex: "value1",
		key: "value1",
	},
	{
		title: "ลำดับ",
		dataIndex: "value2",
		key: "value2",
		render: (_, { value2, isChanged }) => {
			return (
				<div className={`w-full h-full ${isChanged ? "bg-yellow-300" : ""}`}>
					{value2}
				</div>
			);
		},
	},
];
