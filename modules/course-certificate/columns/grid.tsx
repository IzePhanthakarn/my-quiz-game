"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/CustonCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "@/components/CustomGrid/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import ExtraRouter from "@/utils/function-component/ExtraRouter";

export const grid: TableProps["columns"] = [
	{
		title: "สถานะ",
		key: "isActive",
		dataIndex: "isActive",
		width: 150,
		render: (_, { isActive }) => <StatusIndicator status={isActive} />,
	},
	{
		sorter: true,
		key: "courseCategory",
		dataIndex: "courseCategory",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"courseCategory"}
				label={"Course Category"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		sorter: true,
		key: "ssoCourseCode",
		dataIndex: "ssoCourseCode",
		title: (columns: ColumnTitleProps<any>) => (
			<CustomHeaderSort
				columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
				headerKey={"ssoCourseCode"}
				label={"Sso Course Code"}
				sort={columns?.sortColumns}
			/>
		),
	},
	{
		key: "uuid",
		title: "คำสั่ง",
		dataIndex: "uuid",
		render: (_, { uuid }) => {
			const router = ExtraRouter();
			return (
				<CustomCellButton
					editFunction={() => router.push(LINKS.COURSE_CERTIFICATE.edit + uuid)}
					mode={BUTTON_MODE.EDIT_ONLY_ICON}
				/>
			);
		},
	},
];
