"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "noSeq",
		dataIndex: "noSeq",
	},
	{
		title: "เลขที่ใบเรียกเก็บเงิน",
		key: "RETURN_MONEY_CODE",
		dataIndex: "RETURN_MONEY_CODE",
	},
	{
		title: "เลขที่ใบคำขอ",
		key: "REQUEST_FORM_CODE",
		dataIndex: "REQUEST_FORM_CODE",
	},
	{
		title: "วันที่ออกใบเรียกคืนเงิน",
		key: "RETURN_DATE",
		dataIndex: "RETURN_DATE",
	},
	{
		title: "เรียกเงินคืนจาก",
		key: "RETURN_DETAIL_DESC",
		dataIndex: "RETURN_DETAIL _DESC",
	},
	{
		title: "จ่ายโดย",
		key: "PAY_BY",
		dataIndex: "PAY_BY",
	},
	{
		title: "ค่าตรวจร่างกาย",
		key: "RETURN_MONEY",
		dataIndex: "RETURN_MONEY",
	},
	{
		title: "สถานะรับคืน",
		key: "RETURN_MONEY_STATUS",
		dataIndex: "RETURN_MONEY_STATUS",
	},
	{
		title: "เลขที่ประสบอันตราย",
		key: "ACCIDENT_ISSUE_CODE_FORMAT",
		dataIndex: "ACCIDENT_ISSUE_CODE_FORMAT",
	},
	{
		title: "ชื่อลูกจ้าง",
		key: "EMPLOYEE_NAME",
		dataIndex: "EMPLOYEE_NAME",
	}
];
