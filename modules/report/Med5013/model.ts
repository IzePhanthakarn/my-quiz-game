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
		key: "HospitalWcfCode",
		dataIndex: "HospitalWcfCode",
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
		title: "ประเภท",
		key: "HOSPITAL_CATEGORY_TEXT",
		dataIndex: "HOSPITAL_CATEGORY_TEXT",
	},
	{
		title: "ระดับ",
		key: "HOSPITAL_TYPE_TEXT",
		dataIndex: "HOSPITAL_TYPE_TEXT",
	},
	{
		title: "วันที่ยกเลิก",
		key: "CONTRACT_END_DATE",
		dataIndex: "CONTRACT_END_DATE",
	},
];
