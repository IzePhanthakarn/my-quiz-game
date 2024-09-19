"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: (columns: ColumnTitleProps<any>) => {
					return (
						<CustomHeaderSort
							columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
							headerKey={"isActive"}
							label={"สถานะ"}
							sort={columns?.sortColumns}
						/>
					);
				},
				sorter: true,
				dataIndex: "isActive",
				key: "isActive",
				width: 150,
				render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			},
			{
				title: (_columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={_columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"clinicCode"}
						label={"รหัสคลินิก"}
						sort={_columns?.sortColumns}
					/>
				),
				dataIndex: "clinicCode",
				key: "clinicCode",
				sorter: true,
			},
			{
				title: (_columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={_columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"clinicName"}
						label={"ชื่อคลินิก"}
						sort={_columns?.sortColumns}
					/>
				),
				dataIndex: "clinicName",
				key: "clinicName",
				sorter: true,
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_, { uuid }) => {
					return (
						<CustomCellButton
							editFunction={() => {
								router.push(LINKS.CLINIC.edit + uuid);
							}}
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
