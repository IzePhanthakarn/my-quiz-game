"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "m",
		key: "itemNo",
		dataIndex: "itemNo",
	},
	{
		title: "doctorCode",
		key: "doctorCode",
		dataIndex: "doctorCode",
	},
	{
		title: "TRAINING_NO",
		key: "trainingNo",
		dataIndex: "trainingNo",
	},
	{
		title: "TRAINING_YEAR",
		key: "TRAINING_YEAR",
		dataIndex: "TRAINING_YEAR",
	},
	{
		title: "PROFESSIONAL_CODE",
		key: "PROFESSIONAL_CODE",
		dataIndex: "PROFESSIONAL_CODE",
	},
	{
		title: "titleName",
		key: "titleName",
		dataIndex: "titleName",
	},
	{
		title: "firstName",
		key: "firstName",
		dataIndex: "firstName",
	},
	{
		title: "lastName",
		key: "lastName",
		dataIndex: "lastName",
	},
	{
		title: "diplomaName",
		key: "diplomaName",
		dataIndex: "diplomaName",
	},
	{
		title: "hospitalName",
		key: "hospitalName",
		dataIndex: "hospitalName",
	},
];
