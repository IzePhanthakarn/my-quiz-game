"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import React from "react";

interface Props {
	mounted: string;
	router: AppRouterInstance;
}

export const GetColumns = (prop: Props) => {
	const { router, mounted } = prop;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey="doctorCode"
						label="เลขทะเบียน สปส"
						sort={columns?.sortColumns}
					/>
				),
				dataIndex: "doctorCode",
				key: "doctorCode",
				sorter: true,
			},
			{
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey="professionalCode"
						label="เลขทะเบียนวิชาชีพ"
						sort={columns?.sortColumns}
					/>
				),
				dataIndex: "professionalCode",
				key: "professionalCode",
				sorter: true,
			},
			{
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey="firstname"
						label="ชื่อ-นามสกุล"
						sort={columns?.sortColumns}
					/>
				),
				dataIndex: "firstname",
				key: "firstname",
				sorter: true,
				render: (_, { firstname, lastname }) => `${firstname} ${lastname}`,
			},
			{
				title: "วุฒิเฉพาะทาง",
				dataIndex: "diplomaTypeList",
				key: "diplomaTypeList",
				render: (_, { diplomaTypeList }) => (
					<>
						{diplomaTypeList.map((item: string, index: number) => (
							<p key={index}>{item ? `- ${item}` : null}</p>
						))}
					</>
				),
			},
			{
				title: "ชื่อโรงพยาบาล",
				dataIndex: "hospitalNameList",
				key: "hospitalNameList",
				width: 400,
				render: (_, { hospitalNameList }) => (
					<>
						{hospitalNameList.map((item: string, index: number) => (
							<p key={index}>{item ? `- ${item}` : null}</p>
						))}
					</>
				),
			},
			{
				title: "จังหวัด",
				dataIndex: "provinceCodeList",
				key: "provinceCodeList",
				width: 200,
				render: (_, { provinceCodeList }) => (
					<>
						{provinceCodeList.map((item: string, index: number) => (
							<p key={index}>
								{item ? `- ${findLabelAddress(item, ADDRESS.PROVINCE)}` : null}
							</p>
						))}
					</>
				),
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_, { uuid }) => (
					<CustomCellButton
						editFunction={() => router.push(LINKS.DOCTOR.edit + uuid)}
						mode={BUTTON_MODE.EDIT_ONLY_ICON}
					/>
				),
			},
		],
		[mounted]
	);
	return columns;
};
