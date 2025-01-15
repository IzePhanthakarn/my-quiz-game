"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { Download } from "wcf-component-lib/node_modules/iconoir-react";
import { handleDownloadBase64File } from "../Form/EstimateAdd/service";

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
				key: "originalFileName",
				dataIndex: "originalFileName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"originalFileName"}
						label="ชื่อไฟล์"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { originalFileName, fileBase64 }) => {
					return (
						<p
							className="truncate whitespace-nowrap w-[200px] cursor-pointer text-new hover:underline"
							onClick={() => {
								handleDownloadBase64File(fileBase64);
							}}
						>
							{originalFileName}
						</p>
					);
				},
			},
			{
				sorter: true,
				key: "docName",
				dataIndex: "docName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"docName"}
						label="รายละเอียด"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { docName }) => {
					return <>{docName}</>;
				},
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { fileBase64 }) => {
					return (
						<Download
							className="cursor-pointer "
							onClick={() => {
								handleDownloadBase64File(fileBase64);
							}}
						/>
					);
				},
			},
		],
		[]
	);
	return columns;
};
