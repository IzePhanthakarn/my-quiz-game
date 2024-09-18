"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { setHospitalEtcFilesGridFilterUuidExclusionList } from "../service";
import { HospitalEtcFiles } from "@/modules/hospital/redux/models/etcFilesModel";

interface Props {
	hospitalEtcFiles: HospitalEtcFiles;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
}

export const EtcFilesGrid = (props: Props) => {
	const { hospitalEtcFiles, dispatch, params } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			{
				sorter: true,
				key: "fileName",
				dataIndex: "fileName",
				// width: 150,

				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
						label="ชื่อไฟล์ ภาคผนวกและอื่นๆ"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { fileName }) => {
					return (
						<a
							href={`https://minio-wcf.soilfish.co/wcf2-public/hospital/etcFiles/${fileName}`}
							target="_blank"
						>
							{fileName}
						</a>
					);
				},
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
								await dispatch(
									setHospitalEtcFilesGridFilterUuidExclusionList(
										hospitalEtcFiles,
										uuid,
										params
									)
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalEtcFiles, params]
	);
	return columns;
};
