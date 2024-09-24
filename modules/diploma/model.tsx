"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { LINKS } from "../../constants/links";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: "สถานะ",
				dataIndex: "isActive",
				key: "isActive",
				width: 150,
				render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			},
			{
				title: (columns: ColumnTitleProps<any>) => (
					<div>
						<CustomHeaderSort
							columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
							headerKey={"diplomaType"}
							label={"รหัสประกาศนียบัตร"}
							sort={columns?.sortColumns}
						/>
					</div>
				),
				dataIndex: "diplomaType",
				key: "diplomaType",
				sorter: true,
			},
			{
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"diplomaName"}
						label={"ชื่อประกาศนียบัตร"}
						sort={columns?.sortColumns}
					/>
				),
				dataIndex: "diplomaName",
				key: "diplomaName",
				sorter: true,
			},
			{
				title: "คำสั่ง",
				dataIndex: "uuid",
				key: "uuid",
				render: (_, { uuid }) => {
					return (
						<CustomCellButton
							editFunction={() => router.push(LINKS.DIPLOMA.edit + uuid)}
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
