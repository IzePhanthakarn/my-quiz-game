"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { Download } from "wcf-component-lib/node_modules/iconoir-react";

export const EstimateAddFilesGrid = () => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				title: "ลำดับที่",
				key: "noSeq",
				dataIndex: "noSeq",
			},
			{
				sorter: true,
				key: "name",
				dataIndex: "name",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"name"}
						label="ชื่อไฟล์"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { name }) => {
					return (
						<a
							href={`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp7/${name}`}
							target="_blank"
						>
							{name}
						</a>
					);
				},
			},
			{
				sorter: true,
				key: "detail",
				dataIndex: "detail",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"detail"}
						label="รายละเอียด"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { detail }) => {
					return <>{detail}</>;
				},
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_) => {
					return <Download />;
				},
			},
		],
		[]
	);
	return columns;
};
