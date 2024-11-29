"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { hospitalAnnouncedPriceFileUploadStatusName } from "../interfaces/name";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: true,
				key: "hospitalWcfCode",
				dataIndex: "hospitalWcfCode",
				width: 300,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"hospitalWcfCode"}
						label={hospitalAnnouncedPriceFileUploadStatusName.hospitalWcfCode}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "announcedYear",
				dataIndex: "announcedYear",
				width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"announcedYear"}
						label={hospitalAnnouncedPriceFileUploadStatusName.announcedYear}
						sort={columns?.sortColumns}
					/>
				),
			},

			{
				sorter: true,
				key: "status",
				dataIndex: "status",
				width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"status"}
						label={hospitalAnnouncedPriceFileUploadStatusName.status}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "errorReason",
				dataIndex: "errorReason",
				width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"errorReason"}
						label={hospitalAnnouncedPriceFileUploadStatusName.errorReason}
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "createdDate",
				dataIndex: "createdDate",
				width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"createdDate"}
						label={hospitalAnnouncedPriceFileUploadStatusName.createdDate}
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
							editFunction={
								() => {}
								// router.push(
								// 	LINKS.HOSPITAL.hospitalAnnouncedPriceFileUploadStatus.edit +
								// 		uuid
								// )
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
