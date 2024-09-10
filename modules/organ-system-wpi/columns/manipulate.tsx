"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
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
				key: "organSystemNo",
				dataIndex: "organSystemNo",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"organSystemNo"}
						label={"Organ System No"}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "description",
				dataIndex: "description",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"description"}
						label={"Description"}
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
							editFunction={() =>
								router.push(LINKS.ORGAN_SYSTEM_WPI.edit + uuid)
							}
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
