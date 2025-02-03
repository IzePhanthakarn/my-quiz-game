"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { names } from "../interfaces/names";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import { convertDateFormatBuddhist } from "wcf-component-lib/src/utils/dayjsThai";
import { DateFormatBuddhist } from "wcf-component-lib/src/constants/date-format.constant";

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
				sorter: false,
				key: "hospitalWcfCode",
				dataIndex: "hospitalWcfCode",
				title: `รหัส`,

				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"hospitalWcfCode"}
				// 		label={"รหัส"}
				// 		// label={names.hospitalWcfCode}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			{
				sorter: false,
				key: "hospitalCategory",
				dataIndex: "hospitalCategory",
				title: `${names.hospitalCategory}`,
				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"hospitalCategory"}
				// 		label={"ประเภท"}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			{
				sorter: false,
				key: "hospitalName",
				dataIndex: "hospitalName",
				title: `${names.hospitalName}`,

				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"hospitalName"}
				// 		label={names.hospitalName}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			{
				sorter: false,
				key: "address",
				dataIndex: "address",
				title: `${names.address}`,
				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"address"}
				// 		label={names.address}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			{
				sorter: false,
				key: "amphurCode",
				dataIndex: "amphurCode",
				title: `${names.amphurCode}`,
				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"amphurCode"}
				// 		label={names.amphurCode}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			{
				sorter: false,
				key: "provinceCode",
				dataIndex: "provinceCode",
				title: `${names.provinceCode}`,
				// title: (columns: ColumnTitleProps<any>) => (
				// 	<CustomHeaderSort
				// 		columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				// 		headerKey={"provinceCode"}
				// 		label={names.provinceCode}
				// 		sort={columns?.sortColumns}
				// 	/>
				// ),
			},
			// {
			// 	sorter: true,
			// 	title: names.contractEndDate,
			// 	dataIndex: "contractEndDate",
			// 	render: (_, { contractEndDate }) => {
			// 		return (
			// 			<div>
			// 				{convertDateFormatBuddhist(
			// 					contractEndDate,
			// 					DateFormatBuddhist.DDMMBBBB
			// 				)}
			// 			</div>
			// 		);
			// 	},
			// },
			{
				sorter: true,
				key: "contractEndDate",
				dataIndex: "contractEndDate",
				// title: `${names.contractEndDate}`,
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
				title: "แก้ไข",
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
