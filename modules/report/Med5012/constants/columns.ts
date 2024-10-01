"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "itemNo",
		dataIndex: "itemNo",
	},
	{
		title: "รหัสสถานพยาบาล",
		key: "hospitalWcfCode",
		dataIndex: "hospitalWcfCode",
	},
	{
		title: "ชื่อสถานพยาบาล",
		key: "hospitalName",
		dataIndex: "hospitalName",
	},
	{
		title: "จังหวัด",
		key: "provinceName",
		dataIndex: "provinceName",
	},
	{
		title: "ประเภทสถานพยาบาล",
		key: "hospitalCategoryText",
		dataIndex: "hospitalCategoryText",
	},
	{
		title: "ระดับสถานพยาบาล",
		key: "hospitalTypeText",
		dataIndex: "hospitalTypeText",
	},
	{
		title: "ประเภทการตรวจ",
		key: "inspecTypeText",
		dataIndex: "inspecTypeText",
	},
];