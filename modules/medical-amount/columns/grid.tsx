"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import { convertDateFormatBuddhist } from "wcf-component-lib/src/utils/dayjsThai";
import { DateFormatBuddhist } from "wcf-component-lib/src/constants/date-format.constant";

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
				key: "notice",
				dataIndex: "notice",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"notice"}
						label={"ประกาศ"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "amount",
				dataIndex: "amount",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"amount"}
						label={"ค่าตรวจในสถานที่"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "fareAmount",
				dataIndex: "fareAmount",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fareAmount"}
						label={"ค่าตรวจนอกสถานที่"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "amountLimit",
				dataIndex: "amountLimit",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"amountLimit"}
						label={"รวมค่าตรวจไม่เกิน"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "startEffectiveDate",
				dataIndex: "startEffectiveDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"startEffectiveDate"}
						label={"วันที่เริ่มต้นมีผล"}
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { startEffectiveDate }) => {
					return (
						<p>
							{convertDateFormatBuddhist(
								startEffectiveDate,
								DateFormatBuddhist.DDMMBBBB
							)}
						</p>
					);
				},
			},

			{
				sorter: true,
				key: "endEffectiveDate",
				dataIndex: "endEffectiveDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"endEffectiveDate"}
						label={"วันที่สิ้นสุดมีผล"}
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { endEffectiveDate }) => {
					return (
						<p>
							{convertDateFormatBuddhist(
								endEffectiveDate,
								DateFormatBuddhist.DDMMBBBB
							)}
						</p>
					);
				},
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<CustomCellButton
							editFunction={() => router.push(LINKS.MEDICAL_AMOUNT.edit + uuid)}
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
