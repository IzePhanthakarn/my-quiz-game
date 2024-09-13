"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import StatusIndicator from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Cell/StatusIndicator";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import {
	fetchHospitalAnnouncedPriceFilesList,
	updateInActiveHospitalAnnouncedPriceFiles,
} from "../service";
import {
	HospitalAnnouncedPriceFiles,
	HospitalAnnouncedPriceFilesGridData,
} from "@/modules/hospital/redux/models/announcedPriceFilesModel";

interface Props {
	hospitalAnnouncedPriceFiles: HospitalAnnouncedPriceFiles;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const AnnouncedPriceFilesGrid = (props: Props) => {
	const { hospitalAnnouncedPriceFiles, dispatch, params } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: true,
				key: "announcedYear",
				dataIndex: "announcedYear",
				// width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"announcedYear"}
						label="ประจำปี"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "fileName",
				dataIndex: "fileName",
				// width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
						label="ชื่อไฟล์ เอกสารข้อมูลราคาประกาศ"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "createdDate",
				dataIndex: "createdDate",
				// width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"createdDate"}
						label="วันที่อับโหลด"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "updatedDate",
				dataIndex: "updatedDate",
				// width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"updatedDate"}
						label="วันที่อัพเดทล่าสุด"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "createdBy",
				dataIndex: "createdBy",
				// width: 150,
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"createdBy"}
						label="ผู้อัปโหลด"
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
						<DeleteFilled
							onClick={async () => {
								await dispatch(updateInActiveHospitalAnnouncedPriceFiles(uuid));
								await dispatch(
									fetchHospitalAnnouncedPriceFilesList(
										params,
										hospitalAnnouncedPriceFiles
									)
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalAnnouncedPriceFiles, params]
	);
	return columns;
};
