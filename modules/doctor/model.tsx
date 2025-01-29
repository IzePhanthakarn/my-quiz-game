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
import { findNameDisplay } from "@/components/MedDropDown/service";
import { SESSION_NAME } from "@/components/MedDropDown/model";
import { findE_HospitalProvince } from "./service";

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
				width: 180,
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
				width: 200,
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
				render: (_, { doctorFullName, eTitle, firstname, lastname }) => {
					if (eTitle) {
						return (
							<p>
								{eTitle}
								{firstname} {lastname}
							</p>
						);
					}
					return <p>{doctorFullName}</p>;
				},
			},
			{
				title: "วุฒิบัตรเฉพาะทาง",
				dataIndex: "diplomaTypeList",
				key: "diplomaTypeList",
				width: 200,
				render: (_, { diplomaTypeList, eDiploma }) => {
					if (eDiploma) {
						return <p>- {eDiploma}</p>;
					} else {
						return (
							<>
								{diplomaTypeList.map((item: string, index: number) => (
									<p key={index}>{item ? `- ${item}` : null}</p>
								))}
							</>
						);
					}
				},
			},
			{
				title: "ชื่อโรงพยาบาล",
				dataIndex: "hospitalNameList",
				key: "hospitalNameList",
				width: 400,
				render: (_, { hospitalNameList, eHospital }) => {
					if (eHospital) {
						return <p>- {eHospital}</p>;
					} else {
						return (
							<>
								{hospitalNameList
									? hospitalNameList.map((item: string, index: number) => (
											<p key={index}>{item ? `- ${item}` : null}</p>
									  ))
									: null}
							</>
						);
					}
				},
			},
			{
				title: "จังหวัด",
				dataIndex: "provinceCodeList",
				key: "provinceCodeList",
				width: 200,
				render: (_, { provinceCodeList, eHospital }) => {
					if (eHospital) {
						return <p>- {findE_HospitalProvince(eHospital)}</p>;
					} else {
						return (
							<>
								{provinceCodeList
									? provinceCodeList.map((item: string, index: number) => (
											<p key={index}>
												{item
													? `- ${
															findLabelAddress(item, ADDRESS.PROVINCE) ??
															"อื่นๆ"
													  }`
													: null}
											</p>
									  ))
									: null}
							</>
						);
					}
				},
			},
			{
				title: "แก้ไข",
				dataIndex: "uuid",
				key: "uuid",
				render: (_, { uuid }) => (
					<CustomCellButton
						editFunction={() => router.push(`${LINKS.DOCTOR.edit}/${uuid}`)}
						mode={BUTTON_MODE.EDIT_ONLY_ICON}
					/>
				),
			},
		],
		[mounted]
	);
	return columns;
};
