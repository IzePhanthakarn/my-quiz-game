"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "noSeq",
		dataIndex: "noSeq",
	},
	{
		title: "วันเดือนปีที่จ่ายเงิน",
		key: "PAY_DATE1",
		dataIndex: "PAY_DATE1",
	},
	{
		title: "เลขที่ใบสำคัญรับเงิน",
		key: "SIGNIFICANT_NO",
		dataIndex: "SIGNIFICANT_NO",
	},
	{
		title: "ชื่อแพทย์",
		key: "DOCTOR_NAME",
		dataIndex: "DOCTOR_NAME",
	},
	{
		title: "เลขที่ประสบอันตราย",
		key: "ACCIDENT_ISSUE_CODE",
		dataIndex: "ACCIDENT_ISSUE_CODE",
	},
	{
		title: "ชื่อลูกจ้าง",
		key: "EMPLOYEE_FIRSTNAME",
		dataIndex: "EMPLOYEE_FIRSTNAME",
	},
	{
		title: "วันที่ประเมิน",
		key: "ASSESS_DATE",
		dataIndex: "ASSESS_DATE",
	},
	{
		title: "เลขที่ใบสั่งจ่าย",
		key: "PAYMENT_NO",
		dataIndex: "PAYMENT_NO",
	},
	{
		title: "จำนวนเงิน",
		key: "AMOUNT",
		dataIndex: "AMOUNT",
	},
];
