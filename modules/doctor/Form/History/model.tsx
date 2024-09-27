"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { DoctorCompareList } from "../../redux/history/model";

export const columns: TableProps["columns"] = [
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ลำดับ",
		width: "33.33%",
		dataIndex: "value1",
		key: "value1",
	},
	{
		title: "ลำดับ",
		dataIndex: "value2",
		width: "33.34%",
		key: "value2",
		render: (_, { value2, isChanged }) => {
			if (isChanged) {
				return {
					props: {
						style: { backgroundColor: isChanged ? "#FDE69C" : undefined },
					},
					children: value2,
				};
			} else {
				return {
					children: value2,
				};
			}
		},
	},
];

export const getItems = (compareList: DoctorCompareList) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "ข้อมูลแพทย์",
			children: (
				<BaseGrid
					rows={compareList.doctor}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "2",
			label: "ข้อมูลที่อยู่แพทย์",
			children: (
				<BaseGrid
					rows={compareList.doctor}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
	];
	return items;
};
