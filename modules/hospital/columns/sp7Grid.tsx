"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { setHospitalSp7GridFilterUuidExclusionList } from "../service";
import { HospitalSp7 } from "@/modules/hospital/redux/models/sp7Model";
import { setDialog } from "@/redux/slices/dialog";
import { BaseDialog } from "@/redux/slices/dialog/model";

interface Props {
	hospitalSp7: HospitalSp7;
	dispatch: AppDispatch;
	params: HospitalFormPageProps;
	dialog: BaseDialog;
}

export const Sp7Grid = (props: Props) => {
	const { hospitalSp7, dispatch, params, dialog } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			// {
			// 	title: "สถานะ",
			// 	key: "isActive",
			// 	dataIndex: "isActive",
			// 	width: 150,
			// 	render: (_, { isActive }) => <StatusIndicator status={isActive} />,
			// },
			{
				sorter: true,
				key: "sp7StartDated",
				dataIndex: "sp7StartDated",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"sp7StartDated"}
						label="วันที่ออกใบอนุญาต"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "sp7EndDate",
				dataIndex: "sp7EndDate",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"sp7EndDate"}
						label="วันที่สิ้นสุดใบอนุญาต"
						sort={columns?.sortColumns}
					/>
				),
			},
			{
				sorter: true,
				key: "fileName",
				dataIndex: "fileName",
				title: (columns: ColumnTitleProps<any>) => (
					<CustomHeaderSort
						columnKey={columns?.sortColumns?.[0]?.column.dataIndex}
						headerKey={"fileName"}
						label="ชื่อไฟล์ สพ.7"
						sort={columns?.sortColumns}
					/>
				),
				render: (_, { fileName }) => {
					return (
						<a
							href={`${process.env.NEXT_PUBLIC_MINIO_PATH}/hospital/sp7/${fileName}`}
							target="_blank"
						>
							{fileName}
						</a>
					);
				},
			},
			{
				key: "uuid",
				title: "คำสั่ง",
				dataIndex: "uuid",
				render: (_, { uuid }) => {
					return (
						<DeleteFilled
							onClick={async () => {
								dispatch(
									setDialog({
										...dialog,
										async onConfirm() {
											await dispatch(
												setHospitalSp7GridFilterUuidExclusionList(
													hospitalSp7,
													uuid,
													params
												)
											);
										},
										isOpenBaseConfirmDialog: true,
										content: "คุณต้องการลบไฟล์ ใบ สพ.7 ใช่หรือไม่?",
										headerText: "ยืนยันการลบไฟล์",
									})
								);
							}}
						/>
					);
				},
			},
		],
		[hospitalSp7, dialog, params]
	);
	return columns;
};
