"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { names } from "../interfaces/names";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";

export const GetHospitalColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			// {
			// 	title: "สถานะ",
			// 	key: "isActive",
			// 	dataIndex: "isActive",
			// 	width: 150,
			// 	render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			// },
			{
				sorter: true,
				key: "hospitalWcfCode",
				dataIndex: "hospitalWcfCode",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalWcfCode"}
						label={names.hospitalWcfCode}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "hospitalDbmsCode",
				dataIndex: "hospitalDbmsCode",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalDbmsCode"}
						label={names.hospitalDbmsCode}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "hospitalMinistryCode",
				dataIndex: "hospitalMinistryCode",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalMinistryCode"}
						label={names.hospitalMinistryCode}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "hospitalName",
				dataIndex: "hospitalName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalName"}
						label={names.hospitalName}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "contractEndDate",
				dataIndex: "contractEndDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"contractEndDate"}
						label={names.contractEndDate}
						sort={columns?.sortColumns}
					/>
				),
			},

			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<CustomCellButton
							editFunction={() => router.push(LINKS.HOSPITAL.edit + uuid)}
							mode={BUTTON_MODE.EDIT_ONLY_ICON}
						/>
					);
				},
			},
		],
		[]
	);
	return columns;
};
