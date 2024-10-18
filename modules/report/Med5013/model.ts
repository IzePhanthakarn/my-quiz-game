"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับที่",
		key: "itemNo",
		dataIndex: "itemNo",
	},
	{
		title: "รหัสแพทย์",
		key: "doctorCode",
		dataIndex: "doctorCode",
	},
	{
		title: "รุ่น",
		key: "trainingNo",
		dataIndex: "trainingNo",
	},
	{
		title: "ปี",
		key: "TRAINING_YEAR",
		dataIndex: "TRAINING_YEAR",
	},
	{
		title: "เลขที่ใบประกอบโรคศิลป์",
		key: "PROFESSIONAL_CODE",
		dataIndex: "PROFESSIONAL_CODE",
	},
	{
		title: "ชื่อ-นามสกุล",
		key: "doctorName",
		dataIndex: "doctorName",
	},
	{
		title: "วุฆิบัตร",
		key: "diplomaName",
		dataIndex: "diplomaName",
	},
	{
		title: "สถานพยาบาลปัจจุบัน",
		key: "hospitalName",
		dataIndex: "hospitalName",
	},
	{
		title: "ที่อยู่ที่ติดต่อได้",
		key: "contactAddress",
		dataIndex: "contactAddress",
	},
	{
		title: "จังหวัด",
		key: "doctorProvinceName",
		dataIndex: "doctorProvinceName",
	}, 
	{
		title: "โทรศัพท์",
		key: "telephone",
		dataIndex: "telephone",
	},
	{
		title: "หมายเหตุ",
		key: "remark",
		dataIndex: "remark",
	},
];
