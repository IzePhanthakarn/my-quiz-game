"use client";

import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { CollapseProps } from "wcf-component-lib/node_modules/antd/es/collapse";
import BaseGrid from "wcf-component-lib/src/components/BaseGrid";
import { HospitalCompareList } from "../../redux/models/historyModel";
import { IsActive } from "wcf-component-lib/src/constants/constants";
// import { Colors } from "wcf-component-lib/src/constants/Colors";
import React from "react";

const Colors = {
	history: {
		files: {
			new: "#FDE69C",
			deleted: "#f9eaea",
		},
	},
};

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

export const columnsFiles = (
	position: "older" | "newer",
	link: string
): TableProps["columns"] => [
	{
		title: "ชื่อเอกสาร",
		dataIndex: "fileName",
		width: "100%",
		key: "fileName",
		render: (_, { fileName, isNew, isActive }) => {
			return {
				props: {
					style: {
						backgroundColor:
							position === "newer"
								? isActive === IsActive.N
									? Colors.history.files.deleted
									: isNew
									? Colors.history.files.new
									: undefined
								: undefined,
					},
				},
				children: (
					<>
						<a href={`${link}${fileName}`} target="_blank">
							{fileName}
						</a>
					</>
				),
			};
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
					isHaveBorderBottomLeftRight={true}
					bordered={true}
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
					isHaveBorderBottomLeftRight={true}
					bordered={true}
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
					isHaveBorderBottomLeftRight={true}
					bordered={true}
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
					isHaveBorderBottomLeftRight={true}
					bordered={true}
					rows={compareList.hospitalChangedNameData}
					columns={columns}
					twoToneColor
					hideHeader
				/>
			),
		},
		{
			key: "5",
			label: "ไฟล์ สพ7",
			children: (
				<div className="grid gap-x-4 md:gap-x-12 grid-cols-2 pt-6 pb-3 px-5 border-[1px]">
					<BaseGrid
						isHaveBorderBottomLeftRight={true}
						rows={compareList.hospitalSp7.older}
						columns={columnsFiles(
							"older",
							`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp7/`
						)}
						twoToneColor
					/>
					<BaseGrid
						isHaveBorderBottomLeftRight={true}
						rows={compareList.hospitalSp7.newer}
						columns={columnsFiles(
							"newer",
							`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp7/`
						)}
						twoToneColor
					/>
				</div>
			),
		},
		{
			key: "6",
			label: "ไฟล์ สพ19",
			children: (
				<div className="grid gap-x-4 md:gap-x-12 grid-cols-2 pt-6 pb-3 px-5 border-[1px]">
					<BaseGrid
						isHaveBorderBottomLeftRight={true}
						rows={compareList.hospitalSp19.older}
						columns={columnsFiles(
							"older",
							`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp19/`
						)}
						twoToneColor
					/>
					<BaseGrid
						isHaveBorderBottomLeftRight={true}
						rows={compareList.hospitalSp19.newer}
						columns={columnsFiles(
							"newer",
							`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp19/`
						)}
						twoToneColor
					/>
				</div>
			),
		},
	];
	return items;
};
