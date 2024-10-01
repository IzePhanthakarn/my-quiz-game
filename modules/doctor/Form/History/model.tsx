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
		dataIndex: "olderValue",
		key: "olderValue",
	},
	{
		title: "ลำดับ",
		dataIndex: "newerValue",
		width: "33.34%",
		key: "newerValue",
		render: (_, { newerValue, isChanged }) => {
			if (isChanged) {
				return {
					props: {
						style: { backgroundColor: isChanged ? "#FDE69C" : undefined },
					},
					children: newerValue,
				};
			} else {
				return {
					children: newerValue,
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
					rows={compareList.doctorAddress}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "3",
			label: "ข้อมูลวุฒิบัตรเฉพาะทาง",
			children: (
				<div className="w-full justify-between flex space-x-12 py-2 px-6">
					<BaseGrid rows={[]} columns={columnsDoctorDetail} />
					<BaseGrid rows={[]} columns={columnsDoctorDetail} />
				</div>
			),
		},
	];
	return items;
};

export const columnsDoctorDetail: TableProps["columns"] = [
	{
		title: "ลำดับ",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "เลขทะเบียน สปส",
	},
	{
		title: "วุฒิบัตรเฉพาะทาง",
		dataIndex: "diplomaType",
		key: "diplomaType",
	},
	{
		title: "เลขทะเบียนวิชาชีพ",
	},
];
