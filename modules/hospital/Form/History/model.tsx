"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { HospitalCompareList } from "../../redux/models/historyModel";

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

export const getItems = (compareList: HospitalCompareList) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "รหัสสถานพยาบาล",
			children: (
				<BaseGrid
					rows={compareList.codeData}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "2",
			label: "ข้อมูลพื้นฐาน",
			children: (
				<BaseGrid
					rows={compareList.baseData}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "3",
			label: "ข้อมูลกองทุนเงินทดแทน",
			children: (
				<BaseGrid
					rows={compareList.compensationFundInformationData}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "4",
			label: "การเปลี่ยนชื่อสถานพยาบาล",
			children: (
				<BaseGrid
					rows={compareList.hospitalChangedNameData}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
	];
	return items;
};
