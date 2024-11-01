"use client";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
// import { Download } from "wcf-component-lib/node_modules/iconoir-react";
import FileTextOutlined from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/FileTextOutlined";

export const EstimateAddGrid = () => {
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
						label="ชื่อ - สกุล"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { name, lastName }) => {
					return (
						<>
							{name} {lastName}
						</>
					);
				},
			},
			{
				sorter: true,
				key: "email",
				dataIndex: "email",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"email"}
						label="อีเมลล์"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { email }) => {
					return <>{email}</>;
				},
			},
			{
				sorter: true,
				key: "hospitalName",
				dataIndex: "hospitalName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalName"}
						label="ชื่อสถานพยาบาล"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { hospitalName }) => {
					return <>{hospitalName}</>;
				},
			},
			{
				sorter: true,
				key: "reportDate",
				dataIndex: "reportDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"reportDate"}
						label="วันที่แจ้ง"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { reportDate }) => {
					return <>{reportDate}</>;
				},
			},
			{
				key: "uuid",
				title: "",
				dataIndex: "uuid",
				render: (_) => {
					return <FileTextOutlined />;
				},
			},
		],
		[]
	);
	return columns;
};
