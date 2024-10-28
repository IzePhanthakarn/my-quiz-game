"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { CompareAllList, DoctorCompareList } from "../../redux/history/model";

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

export const columnCompareAll: TableProps["columns"] = [
	{
		title: "ครั้งที่",
		width: "5%",
		dataIndex: "editTimes",
		key: "editTimes",
	},
	{
		title: "วันที่",
		width: "15%",
		dataIndex: "updatedDate",
		key: "updatedDate",
		render: (_, { updatedDate }) => {
			const updatedDateSplit = updatedDate.split("T");
			return <>{`${updatedDateSplit[0]} ${updatedDateSplit[1]}`}</>;
		},
	},
	{
		title: "ชื่อข้อมูล",
		width: "20%",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ข้อมูลก่อนแก้ไข",
		width: "20%",
		dataIndex: "olderValue",
		key: "olderValue",
		render: (_, { olderValue }) => {
			return <>{olderValue ?? "-"}</>;
		},
	},
	{
		title: "ข้อมูลหลังแก้ไข",
		width: "20%",
		dataIndex: "newerValue",
		key: "newerValue",
		render: (_, { newerValue }) => {
			return <>{newerValue ?? "-"}</>;
		},
	},
	{
		title: "ผู้แก้ไข",
		width: "20%",
		dataIndex: "updatedBy",
		key: "updatedBy",
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

export const getItemsCompareAll = (compareAllList: CompareAllList[]) => {
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "เปรียบเทียบข้อมูลทั้งหมด",
			children: (
				<BaseGrid
					rows={compareAllList}
					columns={columnCompareAll}
					twoToneColor
				/>
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
