"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "value1",
		key: "value1",
	},
	{
		title: "ลำดับ",
		dataIndex: "value2",
		width: "33.34%",
		key: "value2",
		render: (_, { value2, isChanged }) => {
			if (isChanged) {
				return {
					props: {
						style: { backgroundColor: isChanged ? "#FDE69C" : undefined },
					},
					children: value2,
				};
			} else {
				return {
					children: value2,
				};
			}
		},
	},
];
