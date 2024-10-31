"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "noSeq",
		dataIndex: "noSeq",
	},
	{
		title: "เลขที่ใบสั่งจ่าย",
		key: "returnMoneyCode",
		dataIndex: "returnMoneyCode",
	},
	{
		title: "เลขที่ใบคำขอ",
		key: "requestFormCode",
		dataIndex: "requestFormCode",
	},
	{
		title: "วันที่ออกใบสั่งจ่าย",
		key: "paymentDate",
		dataIndex: "paymentDate",
	},
	{
		title: "จ่ายให้",
		key: "doctorName",
		dataIndex: "doctorName",
	},
	{
		title: "จ่ายโดย",
		key: "payBy",
		dataIndex: "payBy",
	},
	{
		title: "ค่าตรวจร่างกาย",
		key: "amount",
		dataIndex: "amount",
	},
	{
		title: "เลขที่ประสบอันตราย",
		key: "accidentIssueCode",
		dataIndex: "accidentIssueCode",
	},
	{
		title: "ชื่อลูกจ้าง",
		key: "employeeName",
		dataIndex: "employeeName",
	}
];
