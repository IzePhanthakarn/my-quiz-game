"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "ind",
		dataIndex: "ind",
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
		title: "เลขที่/ตำบล",
		key: "tambolName",
		dataIndex: "tambolName",
	},
	{
		title: "อำเภอ",
		key: "amphurName",
		dataIndex: "amphurName",
	},
	{
		title: "จังหวัด",
		key: "provinceName",
		dataIndex: "provinceName",
	},
	{
		title: "รหัสไปรษณีย์",
		key: "postalCode",
		dataIndex: "postalCode",
	},
	{
		title: "เบอร์โทรศัพท์",
		key: "telephoneNumber",
		dataIndex: "telephoneNumber",
	},
];
