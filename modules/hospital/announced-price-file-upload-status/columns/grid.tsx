"use client";

import CustomCellButton from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/CustomCellButton";
import { BUTTON_MODE } from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/model";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { LINKS } from "@/constants/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { hospitalAnnouncedPriceFileUploadStatusName } from "../interfaces/name";
import { convertDateFormatBuddhist } from "wcf-component-lib/src/utils/dayjsThai";
import { DateFormatBuddhist } from "wcf-component-lib/src/constants/date-format.constant";
import { ANNOUNCED_PRICE_FILE_UPLOAD_STATUS } from "@/components/MedDropDown/model";
import { handleDownloadTextFile } from "@/modules/hospital/announced-price-file-upload-status/service";

export const GetColumns = (router: AppRouterInstance) => {
	const columns: TableProps["columns"] = useMemo(
		() => [
			// {
			// 	sorter: true,
			// 	key: "hospital.hospitalWcfCode",
			// 	dataIndex: "hospital.hospitalWcfCode",
			// 	width: 300,
			// 	title: (columns: ColumnTitleProps<any>) => (
			// 		<CustomHeaderSort
			// 			columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
			// 			headerKey={"hospital.hospitalWcfCode"}
			// 			label={hospitalAnnouncedPriceFileUploadStatusName.hospitalWcfCode}
			// 			sort={columns?.sortColumns}
			// 		/>
			// 	),
			// },
			{
				title: hospitalAnnouncedPriceFileUploadStatusName.hospitalWcfCode,
				dataIndex: "hospitalWcfCode",
				render: (_, { hospital }) => {
					return <>{hospital.hospitalWcfCode}</>;
				},
			},
			{
				title: hospitalAnnouncedPriceFileUploadStatusName.hospitalName,
				dataIndex: "hospital",
				render: (_, { hospital }) => {
					return <>{hospital.hospitalName}</>;
				},
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
				title: hospitalAnnouncedPriceFileUploadStatusName.status,
				dataIndex: "status",
				render: (_, { status }) => {
					return (
						<div
							className={`${
								status === ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.DONE &&
								"text-success"
							} ${
								status === ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.ERROR &&
								"text-error"
							}
							${status === ANNOUNCED_PRICE_FILE_UPLOAD_STATUS.UPLOADING && "text-secondary"}`}
						>
							{status}
						</div>
					);
				},
			},

			{
				title: hospitalAnnouncedPriceFileUploadStatusName.errorReason,
				dataIndex: "errorReason",
				width: 200,
				render: (_, { errorReason }) => {
					return (
						<div>
							<p
								onClick={() => {
									handleDownloadTextFile(errorReason);
								}}
								className="truncate whitespace-nowrap w-[200px] cursor-pointer text-new hover:underline"
							>
								{errorReason}
							</p>
						</div>
					);
				},
			},
			{
				title: hospitalAnnouncedPriceFileUploadStatusName.createdDate,
				dataIndex: "createdDate",
				render: (_, { createdDate }) => {
					return (
						<div>
							{convertDateFormatBuddhist(
								createdDate,
								DateFormatBuddhist.DDMMBBBBHHmmss
							)}
						</div>
					);
				},
			},

			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { hospital }) => {
					return (
						<CustomCellButton
							editFunction={() =>
								router.push(LINKS.HOSPITAL.edit + hospital.uuid)
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
