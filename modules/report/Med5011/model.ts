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
		title: "ชื่อสภานพยาบาล",
		key: "hospitalName",
		dataIndex: "hospitalName",
	},
	{
		title: "จังหวัด",
		key: "provinceName",
		dataIndex: "provinceName",
	},
	{
		title: "วันที่ยกเลิกสถานพยาบาล",
		key: "contractEndDate",
		dataIndex: "contractEndDate",
	},
	{
		title: "สาเหตุการยกเลิก",
		key: "remarkChangeName",
		dataIndex: "remarkChangeName",
	},
];
