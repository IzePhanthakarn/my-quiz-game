"use client";
import { AppDispatch } from "@/redux/config/configStore";
import _ from "lodash";
import { TableProps } from "wcf-component-lib/node_modules/antd/es/table";
import CustomHeaderSort from "wcf-component-lib/src/components/BaseGrid/CustomGridCell/Header/CustomHeaderSort";
import { ColumnTitleProps } from "wcf-component-lib/node_modules/antd/es/table/interface";
import { useMemo } from "react";
import DeleteFilled from "wcf-component-lib/node_modules/@ant-design/icons/lib/icons/DeleteFilled";
import { Download } from "wcf-component-lib/node_modules/iconoir-react";
import {
	handleDownloadBase64File,
	setHospitalAssessmentFileDelete,
} from "../Form/HospitalAssessment/service";
import { setDialog } from "@/redux/slices/dialog";
import { BaseDialog } from "@/redux/slices/dialog/model";
import { EstimateAdd, EstimateAddForm } from "../redux/models/hospitalModel";

interface Props {
	dispatch: AppDispatch;
	dialog: BaseDialog;
	estimateAddForm: EstimateAddForm;
}

export const EstimateAddFilesGrid = (props: Props) => {
	const { dispatch, dialog, estimateAddForm } = props;

	const columns: TableProps["columns"] = useMemo(
		() => [
			// {
			// 	title: "ลำดับที่",
			// 	key: "noSeq",
			// 	dataIndex: "noSeq",
			// },
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
								handleDownloadBase64File(fileBase64, originalFileName);
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
				render: (_, { uuid, originalFileName, fileBase64 }) => {
					return (
						<div className="flex gap-2">
							<Download
								className="cursor-pointer "
								onClick={() => {
									handleDownloadBase64File(fileBase64, originalFileName);
								}}
							/>
							<DeleteFilled
								onClick={async () => {
									dispatch(
										setDialog({
											...dialog,
											async onConfirm() {
												await dispatch(
													setHospitalAssessmentFileDelete(
														estimateAddForm,
														originalFileName,
														uuid
													)
												);
											},
											isOpenBaseConfirmDialog: true,
											content: "คุณต้องการลบไฟล์ ใช่หรือไม่?",
											headerText: "ยืนยันการลบไฟล์",
										})
									);
								}}
							/>
						</div>
					);
				},
			},
		],
		[estimateAddForm, dialog]
	);
	return columns;
};
