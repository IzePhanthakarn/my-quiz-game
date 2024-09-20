"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";

export const columns: TableProps["columns"] = [
	{
		title: "สถานพยาบาล",
		key: "propertyText",
		dataIndex: "propertyText",
	},
	{
		title: "รัฐบาล",
		key: "goverment",
		dataIndex: "goverment",
	},
	{
		title: "เอกชน",
		key: "company",
		dataIndex: "company",
	},
	{
		title: "มูลนิธิ",
		key: "foundation",
		dataIndex: "foundation",
	},
	{
		title: "รวม",
		key: "summary",
		dataIndex: "summary",
	},
];
