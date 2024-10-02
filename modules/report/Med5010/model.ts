"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "noSeq",
		dataIndex: "noSeq",
	},
	{
		title: "รหัสสถานพยาบาล",
		key: "hospitalCode",
		dataIndex: "hospitalCode",
	},
	{
		title: "ชื่อสภานพยาบาล",
		key: "hospitalName",
		dataIndex: "hospitalName",
	},
	{
		title: "จังหวัด",
		key: "provinceName",
		dataIndex: "provinceName",
	},
];
