"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import { findLabelAddress } from "wcf-component-lib/src/components/BaseDropDown/service";
import { ADDRESS } from "wcf-component-lib/src/constants/constants";
import { findDiplomaDisplay, findHospitalDisplay } from "@/utils";

export const GetColumns = (router: AppRouterInstance) => {
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
				dataIndex: "diplomaType",
				key: "diplomaType",
				render: (_, { diplomaType }) => (
					<>
						{diplomaType.map((item: string) => (
							<p key={item}>
								{findDiplomaDisplay(item)
									? `- ${findDiplomaDisplay(item)}`
									: ""}
							</p>
						))}
					</>
				),
			},
			{
				title: "ชื่อโรงพยาบาล",
				dataIndex: "hospitalWcfCode",
				key: "hospitalWcfCode",
				width: 400,
				render: (_, { hospitalWcfCode }) => (
					<>
						{hospitalWcfCode.map((item: string) => (
							<p key={item}>
								{findHospitalDisplay(item)
									? `- ${findHospitalDisplay(item).hospitalName}`
									: ""}
							</p>
						))}
					</>
				),
			},
			{
				title: "จังหวัด",
				dataIndex: "hospitalWcfCode",
				key: "hospitalWcfCode",
				width: 200,
				render: (_, { hospitalWcfCode }) => (
					<>
						{hospitalWcfCode.map((item: string) => {
							const hospital = findHospitalDisplay(item);
							return hospital ? (
								<p key={item}>
									- {findLabelAddress(hospital.provinceCode, ADDRESS.PROVINCE)}
								</p>
							) : null;
						})}
					</>
				),
			},
			{
				title: "สถานะ",
				dataIndex: "isActive",
				key: "isActive",
				width: 150,
				render: (_, { isActive }) => <StatusIndicator status={isActive} />,
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
		[]
	);
	return columns;
};
