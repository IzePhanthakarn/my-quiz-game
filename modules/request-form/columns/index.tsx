"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: "สถานะ",
				key: "isActive",
				dataIndex: "isActive",
				width: 150,
				render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			},
			{
				sorter: true,
				key: "requestFormCode",
				dataIndex: "requestFormCode",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"requestFormCode"}
						label={"เลขที่ใบคำขอ"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "requestPayDate",
				dataIndex: "requestPayDate",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"requestPayDate"}
						label={"วันที่ใบคำขอ"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "accidentIssueCode",
				dataIndex: "accidentIssueCode",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"accidentIssueCode"}
						label={"เลขที่ประสบอันตราย"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "doctorCode",
				dataIndex: "doctorCode",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"doctorCode"}
						label={"ชื่อ-นามสกุลแพทย์"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "requestFormStatus",
				dataIndex: "requestFormStatus",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"requestFormStatus"}
						label={"สถานะ"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "paymentStatusFlag",
				dataIndex: "paymentStatusFlag",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"paymentStatusFlag"}
						label={"สถานะสั่งจ่าย"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "approveStatus",
				dataIndex: "approveStatus",
				width: 200,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"approveStatus"}
						label={"สถานะการจ่าย"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				key: "uuid",
				title: "",
				dataIndex: "uuid",
				width: 100,
				render: (_, { uuid }) => (
					<CustomCellButton
						editFunction={() => router.push(LINKS.REQUEST_FORM.edit + uuid)}
						mode={BUTTON_MODE.EDIT_ONLY_ICON}
					/>
				),
			},
		],
		[]
	);
	return columns;
};
